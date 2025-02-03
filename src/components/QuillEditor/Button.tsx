// ButtonContainer.tsx
import React from 'react';
import styled from 'styled-components';
import { jelloVertical } from '../../utils/Animation.tsx';

interface ButtonContainerProps {
    onSave: (e: React.MouseEvent<HTMLButtonElement>) => void; // 매개변수를 받도록 수정
    onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void; // 매개변수를 받도록 수정
}

const Button: React.FC<ButtonContainerProps> = ({ onSave, onCancel }) => {
    return (
        <ButtonContainer>
            <button type="button" onClick={onSave}>저장하기</button>
            <button type="button" onClick={onCancel}>취소하기</button>
        </ButtonContainer>
    );
};

export default Button;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;

    button {
        margin-top: 20px;
        margin-bottom: 20px;
        padding: 10px 20px;
        font-size: 16px;
        background-color: #282c34;
        border: none;
        border-radius: 20px;  
        color: white;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

        &:hover {
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25); 
            animation: ${jelloVertical} 1s ease forwards;
        }

        &:active {
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
            transform: translateY(1px);
        }
    }
`;