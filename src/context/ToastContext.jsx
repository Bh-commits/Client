import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

const ToastContext = createContext(null);

const icons = {
  success: FaCheckCircle,
  error: FaExclamationCircle,
  info: FaInfoCircle
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const pushToast = useCallback((message, type = 'info') => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 4500);
  }, []);

  const value = useMemo(() => ({ pushToast }), [pushToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-[100] flex w-[calc(100%-32px)] max-w-sm flex-col gap-3">
        {toasts.map((toast) => {
          const Icon = icons[toast.type] || icons.info;
          return (
            <div
              key={toast.id}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#0B1120]/95 backdrop-blur-xl px-5 py-4 text-sm font-medium text-white shadow-2xl"
              role="status"
            >
              <Icon className={toast.type === 'error' ? 'mt-0.5 text-red-400 shrink-0 text-base' : 'mt-0.5 text-green-400 shrink-0 text-base'} />
              <span>{toast.message}</span>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used inside ToastProvider');
  }
  return context;
}







