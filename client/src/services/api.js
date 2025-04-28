import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  verifyToken: () => api.get('/auth/verify')
};

// Appointment API calls
export const appointmentAPI = {
  getAppointments: () => api.get('/appointments'),
  createAppointment: (appointmentData) => api.post('/appointments', appointmentData),
  updateAppointment: (id, appointmentData) => api.put(`/appointments/${id}`, appointmentData),
  deleteAppointment: (id) => api.delete(`/appointments/${id}`)
};

// Medical Records API calls
export const medicalRecordAPI = {
  getRecords: () => api.get('/patient/records'),
  getPrescriptions: () => api.get('/patient/prescriptions'),
  createRecord: (recordData) => api.post('/doctor/records', recordData),
  updateRecord: (id, recordData) => api.put(`/doctor/records/${id}`, recordData)
};

// Doctor API calls
export const doctorAPI = {
  getDashboard: () => api.get('/doctor/dashboard'),
  getPatients: () => api.get('/doctor/patients')
};

// Admin API calls
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: () => api.get('/admin/users'),
  createDoctor: (doctorData) => api.post('/admin/doctors', doctorData)
};

export default api; 