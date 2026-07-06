import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import { SEO } from '../../components/ui/SEO';
import { useToast } from '../../context/ToastContext';
import { adminApi } from '../../services/adminApi';
import { getErrorMessage } from '../../services/http';

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { pushToast } = useToast();
  const { register, handleSubmit } = useForm();

  const submit = async (payload) => {
    setLoading(true);
    try {
      const { data } = await adminApi.login(payload);
      localStorage.setItem('ideaclap_admin_token', data.token);
      pushToast('Signed in successfully.', 'success');
      navigate(location.state?.from?.pathname || '/admin', { replace: true });
    } catch (error) {
      pushToast(getErrorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-light px-4 py-12">
      <SEO title="Admin Login" path="/admin/login" />
      <form className="surface w-full max-w-md rounded-lg p-6" onSubmit={handleSubmit(submit)}>
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-navy text-xl text-white">
          <FaLock />
        </span>
        <h1 className="mt-5 text-center font-heading text-3xl font-bold text-ink">IdeaClap Admin</h1>
        <div className="mt-6 grid gap-4">
          <label>
            <span className="mb-2 block text-sm font-semibold text-ink">Email</span>
            <input
              className="focus-ring w-full rounded-lg border border-slate-200 px-4 py-3"
              type="email"
              {...register('email', { required: true })}
            />
          </label>
          <label>
            <span className="mb-2 block text-sm font-semibold text-ink">Password</span>
            <input
              className="focus-ring w-full rounded-lg border border-slate-200 px-4 py-3"
              type="password"
              {...register('password', { required: true })}
            />
          </label>
        </div>
        <button
          className="focus-ring mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white hover:bg-royal disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Signing in' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}







