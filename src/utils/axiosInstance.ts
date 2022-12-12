import axios from 'axios';

import { getCookie } from './cookie';

export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/v1';

export const basicInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export const secureInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

secureInstance.interceptors.request.use(config => {
  if (config.headers) {
    config.headers['X-CSRF-TOKEN'] = getCookie(
      document.cookie,
      'csrf_access_token'
    );
  }
  return config;
});
