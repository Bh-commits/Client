import { http } from './http';

export const publicApi = {
  submitContact: (payload) => http.post('/leads/contact', payload),
  submitConsultation: (payload) => http.post('/leads/consultation', payload),
  subscribe: (payload) => http.post('/leads/newsletter', payload),
  getPortfolio: () => http.get('/public/portfolio'),
  getBlogs: (params) => http.get('/public/blogs', { params }),
  getBlog: (slug) => http.get(`/public/blogs/${slug}`),
  getJobs: () => http.get('/public/careers'),
  getTestimonials: () => http.get('/public/testimonials'),
  applyForJob: (jobId, formData) =>
    http.post(`/careers/${jobId}/apply`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
};






