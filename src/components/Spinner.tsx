import React from 'react';
import styled from 'styled-components';

const Spinner = React.memo(() => (
  <SpinnerContainer>
    <div>데이터 로딩 중..</div>
    <SpinnerImage src={require('../assets/images/spinning.gif')} alt="Loading..." />
    {/* <SpinnerCircle/> */}
  </SpinnerContainer>
));

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(214, 230, 245, 0.925);

  div {
    font-size: 20px;
    font-weight: bold;
    color:#282c34;
    margin-bottom: 20px;
  }
`;

const SpinnerImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover; /* 불필요한 크기 조정을 방지 */
`;

const SpinnerCircle = styled.div`
  width: 150px;
  height: 150px;
  border: 16px solid rgba(214, 230, 245, 0.925);
  border-top: 16px solid #282c34;
  border-radius: 50%;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default Spinner;