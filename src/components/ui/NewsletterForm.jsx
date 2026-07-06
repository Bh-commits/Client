import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope } from 'react-icons/fa';
import { useToast } from '../../context/ToastContext';
import { getErrorMessage } from '../../services/http';
import { publicApi } from '../../services/publicApi';

export function NewsletterForm() {
  const [loading, setLoading] = useState(false);
  const { pushToast } = useToast();
  const { register, handleSubmit, reset } = useForm();

  const submit = async (data) => {
    setLoading(true);
    try {
      await publicApi.subscribe(data);
      reset();
      pushToast('You are subscribed to IdeaClap India Private Limited updates.', 'success');
    } catch (error) {
      pushToast(getErrorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit(submit)}>
      <label className="sr-only" htmlFor="newsletter-email">
        Email
      </label>
      <input
        id="newsletter-email"
        type="email"
        className="focus-ring min-h-11 flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/70"
        placeholder="Email address"
        {...register('email', { required: true })}
      />
      <button
        type="submit"
        className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-navy"
        disabled={loading}
      >
        <FaEnvelope />
        {loading ? 'Saving' : 'Subscribe'}
      </button>
    </form>
  );
}







