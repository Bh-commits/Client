import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const http = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('ideaclap_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';







