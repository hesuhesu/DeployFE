import React from 'react';
import SideBar from './ThreeHome/SideBar.tsx';
import ThirdHomeHeader from './ThreeHome/ThirdHomeHeader.tsx';
import styled from 'styled-components';

const ThirdHome: React.FC = () => {
  return (
    <ThirdHomeContainer>
      <ThirdHomeHeader/>
      <SideBar/>
    </ThirdHomeContainer>
  );
};

export default ThirdHome;

const ThirdHomeContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  @media (max-width: 768px) {
    p {
      font-size: 24px;
    }
  }

  @media (max-width: 480px) {
    p {
      font-size: 18px;
    }
  }
`;