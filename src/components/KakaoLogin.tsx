import React from "react";

const KakaoLogin:React.FC = () => {
    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
    return (
      <button type='button' onClick={() => window.location.href = link}>
        카카오 로그인
      </button>
    );
  };

export default KakaoLogin;