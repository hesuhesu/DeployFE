import axios from 'axios';

const HOST = process.env.REACT_APP_HOST;

const axiosInstance = axios.create({
  baseURL: HOST, // 백엔드 서버 주소
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 시 토큰을 자동으로 추가하는 Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // 로컬 스토리지에 저장된 토큰
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;