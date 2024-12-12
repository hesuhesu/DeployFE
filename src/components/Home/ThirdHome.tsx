import React from 'react';
import styled from 'styled-components';

const ThirdHome: React.FC = () => {
    return (
        <ThirdHomeContainer>
            <p>3 화면 입니다.</p>
        </ThirdHomeContainer>
    )
}

export default ThirdHome;

const ThirdHomeContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 30px;
  }

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