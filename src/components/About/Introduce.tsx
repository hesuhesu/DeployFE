import React from 'react';
import styled from 'styled-components';
import { flipInHorBottom } from '../../utils/Animation.tsx';
import Description from './Description.tsx';

const Introduce: React.FC = () => {
    return (
        <IntroduceContainer>
            <img src={require('../../assets/images/profile.webp')} alt="Description" />
            <h2>은희수</h2>
            <Description/>
        </IntroduceContainer>
    );
}

export default Introduce;

const IntroduceContainer = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: center;
    background-color: #282c34;
    border: 0.3125rem solid rgba(214, 230, 245, 0.925); // 5px
    border-radius: 0.625rem; // 10px
    overflow: hidden;
    height: 90%;
    width: 40%;
    animation: ${flipInHorBottom} 0.5s ease forwards;

    img {
        max-width: 100%;
        height: 30%;
        border-radius: 0.625rem;
    }

    h2 {
        font-size: 3rem;

        @media (max-width: 480px) {
            font-size: 1.8rem;
        }

        @media (max-width: 344px) {
            font-size: 1.5rem;
        }
    }

    @media (max-width: 1680px) {

        h2 {
            font-size: 2.75rem;
        }

        img {
            height: 27.5%;
        }
    }

    @media (max-width: 1200px) {
        width: 70%;

        h2 {
            font-size: 2.5rem;
        }

        img {
            height: 30%;
        }
    }

    @media (max-width: 768px) {
        width: 90%;
        h2 {
            font-size: 2rem;
        }

        img {
            height: 27.5%;
        }
    }
`;