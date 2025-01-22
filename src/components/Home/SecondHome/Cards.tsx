import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const Cards: React.FC = () => {
  const [buttonOn, setButtonOn] = useState<boolean>(false);

  const techStacks = [
    { name: 'SASS', logo: 'sass.svg' },
    { name: 'JavaScript', logo: 'javascript.svg' },
    { name: 'TypeScript', logo: 'typescript.svg' },
    { name: 'React', logo: 'react.svg' },
    { name: 'Vue', logo: 'vue.svg' },
    { name: 'Three.js', logo: 'threejs.svg' },
    { name: 'NodeJS', logo: 'nodejs.svg' },
    { name: 'MongoDB', logo: 'mongodb.svg' },
    { name: 'MySQL', logo: 'mysql.svg' },
    { name: 'AWS EC2', logo: 'aws.svg' },
    { name: 'NGINX', logo: 'nginx.svg' },
    { name: 'PM2', logo: 'pm2.svg' },
  ];

  return (
    <CardContainer style={{ width: buttonOn ? '36vw' : '10vw' }}>
      {buttonOn ? (
        techStacks.map((stack, index) => (
          <Card key={index} style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
            <img src={require(`../../../assets/images/${stack.logo}`)} alt={`${stack.name} logo`} />
            <p>{stack.name}</p>
          </Card>
        ))
      ) : (
        <button onClick={() => setButtonOn(true)}>Click ME</button>
      )}
    </CardContainer>
  );
};

export default Cards;

const fadeIn = keyframes`
  from {
  }
  to {
    opacity: 0.5;
    pointer-events: auto; /* hover 활성화 */
    transform: translateY(0);
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  transition: width 0.5s ease, transform 0.3s ease, opacity 0.3s ease;

  button {
    padding: 20px 30px;
    font-size: 30px;
    font-weight: bold;
    color: #282c34;
    background-color: rgba(214, 230, 245, 0.925);
    border: none;
    border-radius: 5px;
    opacity: 0.5;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
      opacity: 1;
      box-shadow: 0 0 15px 5px rgba(214, 230, 245, 0.925); /* 빛나는 효과 */
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

const Card = styled.div`
  width: 7vw;
  height: 15vh;
  background-color: rgba(214, 230, 245, 0.925);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: none; /* hover 방지 */
  padding: 10px;
  opacity: 0;
  
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: 0s; /* 스타일에서 애니메이션 딜레이를 제어 */

  img {
    width: 6vh;
    height: 8vh;
    object-fit: contain;
  }

  p {
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }

  &:hover {
    transform: scale(1.1) !important;
    opacity: 1.0 !important;
    box-shadow: 0 0 15px 5px rgba(214, 230, 245, 0.925) !important; /* 빛나는 효과 */
  }
`;