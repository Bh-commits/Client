import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { SEO } from '../../components/ui/SEO';
import { useToast } from '../../context/ToastContext';
import { adminApi } from '../../services/adminApi';
import { getErrorMessage } from '../../services/http';

const resourceConfig = {
  services: {
    title: 'Services',
    fields: ['title', 'category', 'description', 'items'],
    transform: (data) => ({ ...data, items: splitList(data.items) })
  },
  portfolio: {
    title: 'Portfolio',
    fields: ['title', 'category', 'description', 'technologies', 'url'],
    transform: (data) => ({ ...data, technologies: splitList(data.technologies) })
  },
  blogs: {
    title: 'Blogs',
    fields: ['title', 'category', 'excerpt', 'content'],
    transform: (data) => data
  },
  careers: {
    title: 'Careers',
    fields: ['title', 'type', 'location', 'description'],
    transform: (data) => data
  },
  testimonials: {
    title: 'Testimonials',
    fields: ['name', 'role', 'quote'],
    transform: (data) => data
  },
  leads: {
    title: 'Leads',
    readonly: true
  },
  subscribers: {
    title: 'Newsletter Subscribers',
    readonly: true
  }
};

export default function AdminResource() {
  const { resource = 'leads' } = useParams();
  const config = resourceConfig[resource] || resourceConfig.leads;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { pushToast } = useToast();
  const { register, handleSubmit, reset } = useForm();

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await adminApi.list(resource);
      setItems(data.items || []);
    } catch (error) {
      pushToast(getErrorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  const columns = useMemo(() => {
    const first = items[0] || {};
    return Object.keys(first)
      .filter((key) => !['_id', '__v', 'password', 'image', 'resume'].includes(key))
      .slice(0, 6);
  }, [items]);

  const create = async (data) => {
    try {
      const payload = config.transform ? config.transform(data) : data;
      await adminApi.create(resource, payload);
      reset();
      pushToast(`${config.title} item created.`, 'success');
      load();
    } catch (error) {
      pushToast(getErrorMessage(error), 'error');
    }
  };

  const remove = async (id) => {
    try {
      await adminApi.remove(resource, id);
      pushToast('Item deleted.', 'success');
      load();
    } catch (error) {
      pushToast(getErrorMessage(error), 'error');
    }
  };

  return (
    <main className="container-page py-8 lg:py-10">
      <SEO title={`Admin ${config.title}`} path={`/admin/${resource}`} />
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-royal">Manage</p>
        <h1 className="font-heading text-4xl font-bold text-ink">{config.title}</h1>
      </div>

      {!config.readonly ? (
        <form className="surface mt-8 rounded-lg p-5" onSubmit={handleSubmit(create)}>
          <div className="grid gap-4 md:grid-cols-2">
            {config.fields.map((field) => (
              <label key={field} className={['description', 'content', 'quote'].includes(field) ? 'md:col-span-2' : ''}>
                <span className="mb-2 block text-sm font-semibold capitalize text-ink">{field}</span>
                {['description', 'content', 'quote'].includes(field) ? (
                  <textarea
                    className="focus-ring min-h-28 w-full rounded-lg border border-slate-200 px-4 py-3"
                    {...register(field, { required: true })}
                  />
                ) : (
                  <input className="focus-ring w-full rounded-lg border border-slate-200 px-4 py-3" {...register(field, { required: true })} />
                )}
              </label>
            ))}
          </div>
          <button className="focus-ring mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white" type="submit">
            <FaPlus />
            Add {config.title}
          </button>
        </form>
      ) : null}

      <div className="surface mt-8 overflow-hidden rounded-lg">
        <div className="border-b border-slate-200 p-4">
          <p className="font-semibold text-ink">{loading ? 'Loading records' : `${items.length} records`}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-light text-xs uppercase tracking-[0.12em] text-muted">
              <tr>
                {columns.length ? columns.map((column) => <th key={column} className="px-4 py-3">{column}</th>) : <th className="px-4 py-3">Item</th>}
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item._id}>
                  {columns.length ? (
                    columns.map((column) => (
                      <td key={column} className="max-w-xs truncate px-4 py-3 text-slate-700">
                        {formatValue(item[column])}
                      </td>
                    ))
                  ) : (
                    <td className="px-4 py-3 text-slate-700">{item.email || item.title || item.name}</td>
                  )}
                  <td className="px-4 py-3">
                    {config.readonly ? null : (
                      <button
                        type="button"
                        className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg text-red-600 hover:bg-red-50"
                        onClick={() => remove(item._id)}
                        aria-label="Delete"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

function splitList(value = '') {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatValue(value) {
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'object' && value !== null) return value.url || JSON.stringify(value);
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return value || '-';
}







