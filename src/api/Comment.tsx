// authService.ts
import AxiosInstance from './AxiosInstance.tsx';

// Access Token 재발급 함수
export const refreshAccessToken = async () => {
    const token = localStorage.getItem('refreshToken');

    try {
        const response = await AxiosInstance.post('/auth/token',
            null,
            {
                headers: {
                    'Authorization': token  // Authorization 헤더 설정
                },
                withCredentials: true // 쿠키 포함 요청
            }
        );

        localStorage.setItem('accessToken', response.data.accessToken);
        return true;
    } catch (error) {
        return false;
    }
}