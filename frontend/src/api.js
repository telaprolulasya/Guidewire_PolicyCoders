import axios from 'axios';

// In production (after deploy), VITE_API_URL is set to the Vercel backend URL
// In development, Vite proxy forwards /api to localhost:3000
const baseURL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

const api = axios.create({ baseURL });

export default api;
