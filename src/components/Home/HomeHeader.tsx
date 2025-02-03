import React from 'react';
import styled from 'styled-components';
import { blink } from '../../utils/Animation.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';

const HomeHeader: React.FC = () => {
  const scrollToSection = () => {
    const start = window.scrollY; // 현 위치
    const target = window.innerHeight * 1.0; // 100vh
    const distance = target - start; // 100vh 에서 현 위치 뺀 거리
    const duration = 2000; // 2초
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0에서 1로 비율 계산

      window.scrollTo(0, start + distance * easeInOutQuad(progress)); // 스크롤 위치 업데이트

      if (progress < 1) {
        requestAnimationFrame(animation); // 계속 애니메이션 진행
      }
    };
    requestAnimationFrame(animation);
  };

  // 이징 함수
  const easeInOutQuad = (t: number) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

    return (
      <H1 onClick={scrollToSection}>
        <FontAwesomeIcon icon={faArrowAltCircleDown} size="2x" />
      </H1>
    )
}

export default HomeHeader;

const H1 = styled.h1`
  height: 40vh;
  font-size: 3vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${blink} 2s infinite; /* 애니메이션 적용 */
`;