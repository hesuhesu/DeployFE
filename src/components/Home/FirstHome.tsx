import React from 'react';
import styled from 'styled-components';
import useIntersectionObserver from '../../utils/useIntersectionObserver.tsx';
import { fadeIn } from '../Animation.tsx';

const FirstHome: React.FC = () => {
  const { isVisible, elementRef } = useIntersectionObserver({ threshold: 0.5 });

    return (
        <FirstHomeContainer ref={elementRef} style={{ opacity: isVisible ? 1 : 0 }}>
            <h2>Future Possibility</h2>
            <strong>노력, 인내, 성취</strong>
            <strong>지식의 점진적 과부화</strong>
            <p>Frontend 개발자 은희수입니다!</p>
        </FirstHomeContainer>
    )
}

export default FirstHome;

const FirstHomeContainer = styled.div`
  height: 150vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s ease-in-out; // fadeIn 을 위한 효과

  &.fade-in {
    animation: ${fadeIn} 1s ease forwards;
  }

  h2 {
    font-size: 60px;
  }
  p {
    font-size: 30px;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 48px;
    }
    p {
      font-size: 24px;
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 32px;
    }
    p {
      font-size: 16px;
    }
  }
`;