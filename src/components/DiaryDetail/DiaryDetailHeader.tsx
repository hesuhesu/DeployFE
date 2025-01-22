import React from 'react';
import styled from 'styled-components';

interface Data {
    title: string;
    category: string;
    createdAt: string;
}

interface Props {
    data: Data
}

const DiaryDetailHeader: React.FC<Props> = ({ data }) => {
    return (
        <DiaryDetailHeaderContainer>
            <HeaderOne>
                <img src={require(`../../assets/images/${data.category.toLowerCase()}.svg`)} alt="" />
                <p>{data.title}</p>
            </HeaderOne>
            <h2>작성 일시 : {data.createdAt}</h2>
        </DiaryDetailHeaderContainer>
    );
};

export default DiaryDetailHeader;

const DiaryDetailHeaderContainer = styled.div`
    h2 {
        display: flex;
        justify-content: center; 
        align-items: center;
        font-size: 1rem;
        color: #282c34;
    }
`;

const HeaderOne = styled.h1`
    height: 15vw;
    display: flex;
    justify-content: center; 
    align-items: center;
    position: relative;
    font-size: 1.5vw;
    color: #282c34;
    text-shadow: 
        2px 2px 0 rgba(214, 230, 245, 0.925), // 오른쪽 아래
        -2px -2px 0 rgba(214, 230, 245, 0.925), // 왼쪽 위
        2px -2px 0 rgba(214, 230, 245, 0.925), // 오른쪽 위
        -2px 2px 0 rgba(214, 230, 245, 0.925); // 왼쪽 아래
    
    img {
        position: absolute; /* 절대 위치 */
        height: 70%;
        opacity: 0.3;
        left: 50%; /* 중앙 정렬 */
        transform: translate(-50%); /* 중앙 정렬 보정 */
    }

    p {
        position: relative; /* 상대 위치 */
        margin: 0; /* 기본 마진 제거 */
    }
`;