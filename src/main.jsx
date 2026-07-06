import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import './styles/index.css';
import 'swiper/css';
import 'swiper/css/pagination';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ToastProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToastProvider>
    </HelmetProvider>
  </StrictMode>
);







