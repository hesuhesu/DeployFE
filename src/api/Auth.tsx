import AxiosInstance from './AxiosInstance';

// 회원가입
export const register = async (username, password) => {
  try {
    const response = await AxiosInstance.post('/auth/register', { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '회원가입 실패' };
  }
};

// 로그인
export const login = async (username, password) => {
  try {
    const response = await AxiosInstance.post('/auth/login', { username, password });
    const { token } = response.data;
    localStorage.setItem('token', token); // 토큰 저장
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '로그인 실패' };
  }
};

// 로그아웃
export const logout = () => {
  localStorage.removeItem('token'); // 토큰 제거
};