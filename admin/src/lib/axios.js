import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// This runs on EVERY request, gets a FRESH token each time, and attaches it
axiosInstance.interceptors.request.use(
  async (config) => {
    console.log('🚀 Request:', config.method.toUpperCase(), config.url);

    try {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('🔑 Token attached:', token.slice(0, 20) + '...');
      } else {
        console.warn('⚠️ No Clerk token available yet');
      }
    } catch (err) {
      console.error('⚠️ Could not get Clerk token:', err);
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;