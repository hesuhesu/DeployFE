import AxiosInstance from './AxiosInstance.tsx';

export const login = async (loginData: { username: string; password: string }) => {
  return await AxiosInstance.post(`/auth/login`, loginData,
    {
      withCredentials: true
    }
  );
};

export const register = async (loginData: { username: string; password: string }) => {
  return await AxiosInstance.post(`/auth/register`, loginData);
};