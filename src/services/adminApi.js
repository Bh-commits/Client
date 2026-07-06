import { http } from './http';

export const adminApi = {
  login: (payload) => http.post('/auth/login', payload),
  me: () => http.get('/auth/me'),
  analytics: () => http.get('/admin/analytics'),
  list: (resource) => http.get(`/admin/${resource}`),
  create: (resource, payload) => http.post(`/admin/${resource}`, payload),
  update: (resource, id, payload) => http.put(`/admin/${resource}/${id}`, payload),
  remove: (resource, id) => http.delete(`/admin/${resource}/${id}`)
};







