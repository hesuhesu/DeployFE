import React from 'react';
import styled from 'styled-components';
import CanvasHome from '../components/Home/CanvasHome.tsx';
import HomeHeader from '../components/Home/HomeHeader.tsx';
import FirstHome from '../components/Home/FirstHome.tsx';
import SecondHome from '../components/Home/SecondHome.tsx';
import ThirdHome from '../components/Home/ThirdHome.tsx'

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <CanvasHome/>
      <HomeHeader/>
      <FirstHome/>
      <SecondHome/>
      <ChartContainer>
        {/*
        <CommitChart owner={'hesuhesu'} repo={'SW_Project'}/>
        <CommitChart owner={'hesuhesu'} repo={'hesuhesu'}/>
        <CommitChart owner={'hesuhesu'} repo={'DeployFE'}/>
        <CommitChart owner={'hesuhesu'} repo={'DeployBE'}/>
        */}
      </ChartContainer>
      <ThirdHome/>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: rgba(214, 230, 245, 0.925);
  height: 430vh;
  background-color: #282c34;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.6),
    0 0 60px rgba(255, 255, 255, 0.45),
    0 0 110px rgba(255, 255, 255, 0.25),
    0 0 100px rgba(255, 255, 255, 0.1);
  position: relative;
`;

const ChartContainer = styled.div`
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem; /* 카드 간격 */
`;