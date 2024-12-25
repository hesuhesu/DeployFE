import React from 'react';
import styled from 'styled-components';
import Cards from '../Home/SecondHome/Cards.tsx';
import useIntersectionObserver from '../../utils/useIntersectionObserver.tsx';

const SecondHome: React.FC = () => {
  const { isVisible, elementRef } = useIntersectionObserver({ threshold: 0.5 });

  return (
    <SecondHomeContainer ref={elementRef} style={{ opacity: isVisible ? 1 : 0 }}>
      <H2Left className={isVisible ? 'fadeIn' : ''}>TECH</H2Left>
      <Cards />
      <H2Right className={isVisible ? 'fadeIn' : ''}>STACK</H2Right>
    </SecondHomeContainer>
  );
};

export default SecondHome;

const SecondHomeContainer = styled.div`
  height: 150vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.5s ease-in-out; // fadeIn 을 위한 효과
`;

const H2Left = styled.h2`
  font-size: 7vw;
  font-weight: bold;
  width: 30vw;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;

  &.fadeIn {
    opacity: 1;
    transform: translateX(0);
  }
`;

const H2Right = styled.h2`
  font-size: 7vw;
  font-weight: bold;
  width: 30vw;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: translateX(30px);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;

  &.fadeIn {
    opacity: 1;
    transform: translateX(0);
  }
`;