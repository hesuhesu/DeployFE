import React, { useMemo, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { textFlickerInGlow, fadeInUp, fadeIn } from '../utils/Animation.tsx';
import { authCheck } from '../utils/authCheck.tsx';
import { successMessage } from '../utils/SweetAlertEvent.tsx';

const Header = React.memo(() => {
    const [status, setStatus] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();

    // 경로에 따라 h1 텍스트 설정
    const pageTitle = useMemo(() => {
        if (authCheck() !== 0){
            setStatus(true);
        }

        switch (location.pathname) {
            case '/about':
                return 'About';
            case '/project':
                return 'Project';
            case '/diary':
                return 'Diary';
            case '/quilleditor':
                return 'Quill Editor';
            default:
                return location.pathname.startsWith('/diary_detail') ? 'My Diary' : 'Portfolio';
        }
    }, [location.pathname]);

    const handleLogout = () => {
        successMessage("로그아웃!");
        localStorage.clear(); 
        setStatus(false);
    }

    return (
        <HeaderContainer>
                {pageTitle === "Portfolio" ? <HomeHeader>{pageTitle}</HomeHeader> : <>
                    {pageTitle === 'Project' ? <ProjectHeader>{pageTitle}</ProjectHeader> : <HeaderOne>{pageTitle}</HeaderOne>}
                </>}
                <NavList>
                    <li><StyledLink to="/">Home</StyledLink></li>
                    <li><StyledLink to="/about">About</StyledLink></li>
                    <li><StyledLink to="/project">Project</StyledLink></li>
                    <li><StyledLink to="/diary">Diary</StyledLink></li>
                </NavList>
                {status ? 
                <h2 onClick={handleLogout}>로그아웃</h2> 
                : 
                <h2 onClick={() => navigate('/authpage')}>로그인 / 회원가입</h2>}
        </HeaderContainer>
    );
});

const Structure = css`
    font-size: 6rem;

    @media (max-width: 1200px) {
        font-size: 5rem; 
    }

    @media (max-width: 768px) {
        font-size: 4.2rem; 
    }

    @media (max-width: 480px) {
        font-size: 3.75rem;
    }

    @media (max-width: 344px) {
        font-size: 3.375rem; 
    }
`;

const HeaderContainer = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    background-color: #282c34;
    color: rgba(214, 230, 245, 0.925);
    padding: 0.65rem;
    text-align: center;
    position: relative;

    @media (max-width: 1200px) {
        padding: 0.6rem;
    }

    @media (max-width: 480px) {
        padding: 0.5rem;
    }

    h2 {
        font-size: 1rem;
        position: absolute;
        transform: translateY(-10vh); /* 위로 이동 */
        opacity: 1;
        left: 90%;

        @media (max-width: 768px) {
            font-size: 0.8rem;
        }

        @media (max-width: 480px) {
            font-size: 0.7rem;
        }
    }

    h2:hover {
        color: #61dafb;
    }
`;

const HeaderOne = styled.h1`
    ${Structure}
    animation: ${fadeIn} 0.7s ease forwards;
    opacity: 0;
`;

const HomeHeader = styled.h1`
    ${Structure}
    text-shadow: 0 0 30px rgba(255, 255, 255, .6), 0 0 60px rgba(255, 255, 255, .45), 0 0 110px rgba(255, 255, 255, .25), 0 0 100px rgba(255, 255, 255, .1);
`;

const ProjectHeader = styled.h1`
    ${Structure}
    animation: ${textFlickerInGlow} 2s ease forwards;   
`;

const NavList = styled.ul`
    list-style-type: none;
    padding: 0;

    li {
        display: inline-block; // inline-block으로 변경하여 transform 효과 적용
        margin: 0 1rem;
        opacity: 0; // 기본적으로 숨김
        transform: translateY(1.25rem);
        animation: ${fadeInUp} 0.5s forwards;

        // 순서에 따른 지연
        &:nth-child(1) {
            animation-delay: 0.1s;
        }
        &:nth-child(2) {
            animation-delay: 0.2s;
        }
        &:nth-child(3) {
            animation-delay: 0.3s;
        }
        &:nth-child(4) {
            animation-delay: 0.4s;
        }
    }

    @media (max-width: 1200px) {
        li {
            margin: 0 0.875rem; // 0 14px 
        }
    }

    @media (max-width: 768px) {
        li {
            margin: 0 0.625rem;
            font-size: 0.875rem;
        }
    }

    @media (max-width: 480px) {
        li {
            margin: 0 0.375rem;
            font-size: 0.75rem;
        }
    }

    @media (max-width: 344px) {
        li {
            margin: 0 0.25rem;
            font-size: 0.625rem;
        }
    }
`;

const StyledLink = styled(Link)`
    color: rgba(214, 230, 245, 0.925);
    text-decoration: none;
    display: inline-block; // inline-block으로 변경하여 transform 효과 적용
    transition: transform 0.3s ease; // 부드러운 전환 효과 추가

    &:hover {
        transform: translateY(-0.25rem);
    }

    @media (max-width: 768px) {
        font-size: 0.875rem;
    }

    @media (max-width: 480px) {
        font-size: 0.75rem;
    }

    @media (max-width: 344px) {
        font-size: 0.625rem;
    }
`;

export default Header;