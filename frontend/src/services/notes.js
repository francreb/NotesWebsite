import api from './api';

export const noteService = {
  getNotes: (archived = false) => api.get(`/api/notes?archived=${archived}`),
  getNote: (id) => api.get(`/api/notes/${id}`),
  createNote: (noteData) => api.post('/api/notes', noteData),
  updateNote: (id, noteData) => api.put(`/api/notes/${id}`, noteData),
  deleteNote: (id) => api.delete(`/api/notes/${id}`),
  toggleArchive: (id) => api.patch(`/api/notes/${id}/archive`)
};

export const categoryService = {
  getCategories: () => api.get('/api/categories'),
  createCategory: (categoryData) => api.post('/api/categories', categoryData),
  updateCategory: (id, categoryData) => api.put(`/api/categories/${id}`, categoryData),
  deleteCategory: (id) => api.delete(`/api/categories/${id}`)
};
