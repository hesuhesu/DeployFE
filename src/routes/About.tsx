import React from 'react';
import styled from 'styled-components';
import Introduce from '../components/About/Introduce.tsx';

const About: React.FC = () => {
    return (
        <AboutContainer>
            <Introduce/>
        </AboutContainer>
    );
}

export default About;

const AboutContainer = styled.div`
    height: 100vh;
    display: flex;
    padding: 1rem; // 16px
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    color: rgba(214, 230, 245, 0.925);
    background-color: #282c34;

    @media (max-width: 1200px) {
        padding: 0.75rem; 
    }

    @media (max-width: 768px) {
        padding: 0.5rem;
        height: 90vh;
    }

    @media (max-width: 480px) {
        padding: 0.3rem;
    }

    @media (max-width: 344px) {
        padding: 0.25rem;
    }
`;