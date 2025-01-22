import React, { useEffect } from 'react';
import axios from 'axios';

const KAKAO_REST_API_KEY = process.env.REACT_APP_REST_API_KEY; // 발급받은 REST API 키
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI; // 설정한 Redirect URI

const Callback:React.FC = () => {
  useEffect(() => {
    const getToken = async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      if (code) {
        try {
          const response = await axios.post('https://kauth.kakao.com/oauth/token', null, {
            params: {
              grant_type: 'authorization_code',
              client_id: KAKAO_REST_API_KEY,
              redirect_uri: REDIRECT_URI,
              code: code,
            },
          });

          const accessToken = response.data.access_token;
          console.log('Access Token:', accessToken);

          // 액세스 토큰으로 사용자 정보 요청
          const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          localStorage.setItem('user', JSON.stringify(userResponse.data));
          
          console.log('User Info:', userResponse.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    getToken();
  }, []);

  return (
    <div>
      <h1>로그인 중...</h1>
    </div>
  );
};

export default Callback;