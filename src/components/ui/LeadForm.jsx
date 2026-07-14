import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPaperPlane } from 'react-icons/fa';
import { publicApi } from '../../services/publicApi';
import { getErrorMessage } from '../../services/http';
import { useToast } from '../../context/ToastContext';

const businessTypes = ['Restaurant', 'Clinic', 'Hospital', 'Gym', 'Retail', 'Coaching', 'Hotel', 'Real Estate', 'Other'];

export function LeadForm({ type = 'contact', title = 'Send us your requirement', compact = false }) {
  const [loading, setLoading] = useState(false);
  const { pushToast } = useToast();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const submit = async (data) => {
    setLoading(true);
    try {
      if (type === 'consultation') {
        await publicApi.submitConsultation(data);
      } else {
        await publicApi.submitContact(data);
      }
      reset();
      pushToast('Thanks. Our team will contact you shortly.', 'success');
    } catch (error) {
      pushToast(getErrorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="surface rounded-lg p-5 sm:p-6" onSubmit={handleSubmit(submit)}>
      <h2 className="font-heading text-2xl font-bold text-ink">{title}</h2>
      <div className={`mt-5 grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <Field label="Name" error={errors.name?.message}>
          <input
            className="focus-ring w-full rounded-lg border border-slate-200 bg-white text-ink px-4 py-3"
            {...register('name', { required: 'Name is required' })}
            placeholder="Your name"
          />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input
            className="focus-ring w-full rounded-lg border border-slate-200 bg-white text-ink px-4 py-3"
            {...register('phone', { required: 'Phone is required' })}
            placeholder="+91"
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            className="focus-ring w-full rounded-lg border border-slate-200 bg-white text-ink px-4 py-3"
            type="email"
            {...register('email', { required: 'Email is required' })}
            placeholder="you@company.com"
          />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <input
            className="focus-ring w-full rounded-lg border border-slate-200 bg-white text-ink px-4 py-3"
            {...register('company')}
            placeholder="Company name"
          />
        </Field>
        <Field label="Business Type" error={errors.businessType?.message}>
          <select
            className="focus-ring w-full rounded-xl border border-slate-200 bg-white text-ink px-4 py-3"
            {...register('businessType', { required: 'Business type is required' })}
            defaultValue=""
          >
            <option value="" disabled className="text-gray-400">
              Select type
            </option>
            {businessTypes.map((businessType) => (
              <option key={businessType} value={businessType} className="text-ink">
                {businessType}
              </option>
            ))}
          </select>
        </Field>
        <Field className={compact ? '' : 'sm:col-span-2'} label="Message" error={errors.message?.message}>
          <textarea
            className="focus-ring min-h-32 w-full rounded-lg border border-slate-200 bg-white text-ink px-4 py-3"
            {...register('message', { required: 'Message is required' })}
            placeholder="Tell us what you want to build or improve"
          />
        </Field>
      </div>
      <button
        type="submit"
        className="focus-ring mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-royal disabled:cursor-not-allowed disabled:opacity-60"
        disabled={loading}
      >
        <FaPaperPlane />
        {loading ? 'Submitting' : 'Submit Request'}
      </button>
    </form>
  );
}

function Field({ label, error, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs font-medium text-red-600">{error}</span> : null}
    </label>
  );
}







