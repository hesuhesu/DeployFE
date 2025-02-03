import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { jelloVertical } from '../utils/Animation.tsx';
import { errorMessage, successMessage } from '../utils/SweetAlertEvent.tsx';
import { authCheck } from '../utils/authCheck.tsx';
// import KakaoLogin from '../components/KakaoLogin.tsx';
import { ADMIN_AUTH, ADMIN_NAME, ADMIN_PASSWORD } from '../utils/Variable.tsx';
import { login, register } from '../api/Auth.tsx';

interface LoginItem {
    username: string;
    password: string;
}

const AuthPage: React.FC = () => {
    const [status, setStatus] = useState<boolean>(false);
    const [loginData, setLoginData] = useState<LoginItem>({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (authCheck() === 0) { return; }
        setStatus(!status);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 폼 제출 기본 동작 방지

        if (loginData.username === ADMIN_NAME && loginData.password === ADMIN_PASSWORD) {
            successMessage("환영합니다 관리자님!");
            localStorage.setItem("auth", ADMIN_AUTH);
            navigate(-1);
            return;
        }

        try {
            const response = await login(loginData);
            localStorage.setItem('accessToken', response.data.accessToken);
            successMessage("환영합니다 회원님!");
            navigate(-1);
            return;
        } catch (error) {
            const { message } = error.response.data;
            errorMessage(message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(loginData);
            successMessage("회원 가입 완료!")
        } catch (error) {
            const { message } = error.response.data;
            errorMessage(message);
        }
    };

    return (
        <AuthContainer>
            <AuthBox onSubmit={handleLogin}>
                <h2>Auth</h2>
                <h3>
                    댓글 작성을 위한 인증입니다. 어떠한 개인 정보도 취합하지 않습니다.
                </h3>
                <AuthInput>
                    <input
                        placeholder="username"
                        onChange={(e) => setLoginData((prevState) => ({ ...prevState, username: e.target.value }))}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setLoginData((prevState) => ({ ...prevState, password: e.target.value }))}
                        required
                    />
                </AuthInput>
                <button type="submit">Login</button>
                <button type="button" onClick={handleRegister}>Register</button>
                <button onClick={() => navigate("/")}>HomePage</button>
                {/* <KakaoLogin /> */}
            </AuthBox>
        </AuthContainer>
    );
}

const Structure = css`
    width: 25rem;
    padding: 2.5rem;
    background-color: white; 
    border-radius: 0.625rem;
    box-shadow: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.1); 
    text-align: center;

    @media (max-width: 1200px) {
        width: 22.5rem; 
        padding: 2.25rem; 
    }

    @media (max-width: 768px) {
        width: 20rem; 
        padding: 2rem; 
    }

    @media (max-width: 480px) {
        width: 17.5rem; 
        padding: 1.75rem; 
    }

    @media (max-width: 344px) {
        width: 15rem;
        padding: 1.5rem; 
    }
`;

const AuthContainer = styled.div`
    height: 100vh; 
    width: 100%;
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(214, 230, 245, 0.925);
    color: #282c34;

    button {
        margin-top: 1rem; 
        margin-bottom: 1rem; 
        padding: 0.5rem 1rem;
        background-color: #282c34;
        border: none;
        border-radius: 0.625rem; 
        color: white;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2); 

        &:hover {
            box-shadow: 0 0.375rem 0.75rem rgba(0, 0, 0, 0.25); 
            animation: ${jelloVertical} 1s ease forwards;
        }

        &:active {
            box-shadow: 0 0.1875rem 0.375rem rgba(0, 0, 0, 0.2);
            transform: translateY(1px);
        }

        @media (max-width: 768px) {
            font-size: 0.875rem; 
            padding: 0.5rem 1rem; 
        }

        @media (max-width: 480px) {
            font-size: 0.75rem; 
            padding: 0.375rem 0.875rem; 
        }

        @media (max-width: 344px) {
            font-size: 0.625rem; 
            padding: 0.25rem 0.75rem; 
        }
    }
`;

const AuthInput = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AuthBox = styled.form`
    ${Structure}
    h3 {
        font-size:0.8rem;
    }
`;

export default AuthPage;