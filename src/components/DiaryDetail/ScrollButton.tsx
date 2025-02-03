import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp, faArrowAltCircleDown, faCircleCheck } from '@fortawesome/free-regular-svg-icons';

interface Props {
    navigate: (path: string) => void;
}

const ScrollButton: React.FC<Props> = ({ navigate }) => {
    const scrollToTop = () => {
        const scrollTarget = 0;
        const currentScroll = window.scrollY;
        const distance = scrollTarget - currentScroll;
        const duration = 1000; // 1초 동안 움직이기
        let startTime: number;
    
        const animateScroll = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1); // 0에서 1까지의 진행 상태
    
            window.scrollTo(0, currentScroll + distance * progress); // 스크롤 이동
    
            if (elapsed < duration) {
                requestAnimationFrame(animateScroll); // 애니메이션이 끝날 때까지 반복
            }
        };
        requestAnimationFrame(animateScroll); // 애니메이션 시작
    };
    
    const scrollToBottom = () => {
        const scrollTarget = document.body.scrollHeight;
        const currentScroll = window.scrollY;
        const distance = scrollTarget - currentScroll;
        const duration = 1000; // 1초 동안 움직이기
        let startTime: number;
    
        const animateScroll = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1); // 0에서 1까지의 진행 상태
    
            window.scrollTo(0, currentScroll + distance * progress); // 스크롤 이동
    
            if (elapsed < duration) {
                requestAnimationFrame(animateScroll); // 애니메이션이 끝날 때까지 반복
            }
        };
        requestAnimationFrame(animateScroll); // 애니메이션 시작
    };

    return (
        <ScrollButtonContainer>
            <button onClick={scrollToTop} aria-label="Scroll to Top">
                <FontAwesomeIcon icon={faArrowAltCircleUp} size="2x" />
            </button>
            <button onClick={() => navigate('/diary')} aria-label="Go Diary">
                <FontAwesomeIcon icon={faCircleCheck} size="2x" />
            </button>
            <button onClick={scrollToBottom} aria-label="Scroll to Buttom">
                <FontAwesomeIcon icon={faArrowAltCircleDown} size="2x" />
            </button>
        </ScrollButtonContainer>
    );
};

export default ScrollButton;

const ScrollButtonContainer = styled.div`
    position: fixed;
    bottom: 100px;
    right: 1rem;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    
    button {
        margin: 5px 0;
        padding: 10px;
        font-size: 20px;
        background-color: #282c34;
        border: none;
        border-radius: 50%;
        color: white;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;  // 원 모양 버튼
        height: 40px; // 원 모양 버튼

        &:active {
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
            transform: translateY(1px);
        }
    }
`;