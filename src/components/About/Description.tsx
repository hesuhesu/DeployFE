import React from 'react';
import styled from 'styled-components';

const Description: React.FC = () => {
    return (
        <DescriptionContainer>
            <dt>생년월일</dt>
            <dd>1999.10.30</dd>

            <dt>학력</dt>
            <dd>금성고등학교 (2015.03 ~ 2018.02)</dd>
            <dd>동아대학교 컴퓨터 공학과 (2018.03 ~ 2025.02)</dd>

            <dt>병역</dt>
            <dd>육군 만기 전역 (2019.08 ~ 2021.03)</dd>

            <dt>취미</dt>
            <dd>운동, 피아노</dd>
        </DescriptionContainer>
    );
}

export default Description;

const DescriptionContainer = styled.dl`
    dt {
        margin-top: 1rem;
        margin-bottom: 1rem;
        position: relative;

        &::after {
            content: "";
            display: block;
            width: 100%;
            height: 0.25rem; // 4px
            background: linear-gradient(to right, 
                rgba(214, 230, 245, 0.925), 
                #777, 
                #282c34); /* 그라데이션 색상 */
            position: absolute;
            bottom: -1vh;
        }
    }

    dd {
        margin-top: 0.625rem; // 10px
    }

    @media (max-width: 1200px) {
        dt {
            &::after {
                height: 0.125rem; // 2px
            }
        }
    }

    @media (max-width: 768px) {
        dt {
            font-size: 0.75rem;
        }

        dd {
            font-size: 0.75rem;
        }
    }

    @media (max-width: 480px) {
        dt {
            font-size: 0.6rem;
        }

        dd {
            font-size: 0.6rem; 
        }
    }

    @media (max-width: 344px) {
        dt {
            font-size: 0.5rem;
        }

        dd {
            font-size: 0.5rem;
        }
    }
`;