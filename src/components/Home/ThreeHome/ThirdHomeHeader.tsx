import React from 'react';
import styled from 'styled-components';
import useIntersectionObserver from '../../../utils/useIntersectionObserver.tsx';

const ThirdHomeHeader: React.FC = () => { 
  const { isVisible, elementRef } = useIntersectionObserver({ threshold: 0.5 });
  return (
    <ThirdHomeHeaderContainer ref={elementRef} style={{ opacity: isVisible ? 1 : 0 }}>
      Diary 미리 보기
    </ThirdHomeHeaderContainer>
  );
};

export default ThirdHomeHeader;

const ThirdHomeHeaderContainer = styled.h2`
  transition: opacity 0.5s ease-in-out; // fadeIn 을 위한 효과
  font-size  : 50px;
`;