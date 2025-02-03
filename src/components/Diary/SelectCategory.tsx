import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../utils/Animation.tsx';

interface SelectCategoryProps {
    selectedCategory: string;
    onCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    categories: string[];
}

const SelectCategory: React.FC<SelectCategoryProps> = ({ 
    selectedCategory, 
    onCategoryChange, 
    categories 
}) => (
    <SelectCategoryContainer>
        <label htmlFor="category">카테고리 선택: </label>
        <select id="category" value={selectedCategory} onChange={onCategoryChange}>
            {categories.map((category) => (
                <option key={category} value={category}>
                    {category}
                </option>
            ))}
        </select>
    </SelectCategoryContainer>
);

const SelectCategoryContainer = styled.div`
    margin: 1rem 0;
    display: flex;
    justify-content: right;
    width: 100%;
    animation: ${fadeIn} 1.5s ease forwards;

    label {
        font-size: 1.25rem;
        margin-right: 0.625rem;
        font-weight: bold;
    }

    select {
        padding: 5px 10px;
        margin-right: 10px;
        font-size: 15px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    @media (max-width: 1200px) {
        justify-content: center;

        select {
            padding: 5px 10px;
            margin-right: 0;
            font-size: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
    }
`;

export default SelectCategory;