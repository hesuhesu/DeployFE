import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { authCheck } from '../utils/authCheck.tsx';
import { fadeIn, jelloHorizontal } from '../components/Animation.tsx';
import Spinner from '../components/Spinner.tsx';

const HOST = process.env.REACT_APP_HOST;
const PORT = process.env.REACT_APP_PORT;

interface ReviewItem {
    _id: string;
    title: string;
    content: string;
    category: string;
    createdAt: string;
}

const Experience: React.FC = () => {
    const [api, setApi] = useState<ReviewItem[]>([]);
    const CategoryList = useMemo(() => ['전체', 'React', 'NodeJS', 'Backend', 'Game', 'Etc'], []);
    const [status, setStatus] = useState<boolean>(false); // 관리자 인증
    const [selectedCategory, setSelectedCategory] = useState<string>(CategoryList[0]);
    const [isLoading, setIsLoading] = useState<Boolean>(true); // 로딩 상태 관리
    const navigate = useNavigate();

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        (async () => {
            try {
                const response = await axios.get(`${HOST}:${PORT}/diary/all_read`);
                setApi(response.data.list);
            } catch (error) {
                console.error(error);
            }
            finally {
                // setIsLoading(false);
                timeoutId = setTimeout(() => setIsLoading(false), 500);
            } 
        })();
        if (authCheck() === 0){ return; }
        setStatus(prevStatus => !prevStatus);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    const filteredData = useMemo(() => {
        if (selectedCategory === '전체') {
            return api;
        }
        return api.filter(item => item.category === selectedCategory);
    }, [selectedCategory, api]);

    if (isLoading) {
        return <Spinner/>;
    }

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <DiaryContainer>
            <ButtonContainer>
                {status && <button onClick={() => navigate("/quilleditor")} aria-label="게시물 작성">게시물 작성하기</button>} 
            </ButtonContainer>
            <SelectContainer>
                <label htmlFor="category">카테고리 선택: </label>
                <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                    {CategoryList.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </SelectContainer>
            {filteredData.length > 0 ? (
                <TableContainer>
                    <thead>
                        <tr>
                            <th>분류</th>
                            <th>제목</th>
                            <th>내용</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => (
                            <tr key={item._id} onClick={() => navigate(`/diary_detail/${item._id}`)}>
                                <td><img src={`/${item.category.toLowerCase()}.svg`} alt="없음"/></td>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                                <td>{item.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </TableContainer>
            ): 
            <div>No Data</div>
            }
        </DiaryContainer>
    );
};

const DiaryContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column; // 세로 방향으로 정렬
    align-items: center; // 가로 중앙 정렬
    background-color: rgba(214, 230, 245, 0.925);
    color: #282c34;
`;

const ButtonContainer = styled.div`
    height: 10vh;
    display: flex;
    align-items: center;
    
    animation: ${fadeIn} 1.0s ease forwards;
    button {
        margin-top: 1rem; 
        margin-bottom: 1rem; 
        padding: 0.5rem 1rem; // 8px 16px
        background-color: #282c34;
        border: none;
        border-radius: 0.625rem; // 10px 
        color: white;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2); // 0 4px 8px

        &:hover {
            box-shadow: 0 0.375rem 0.75rem rgba(0, 0, 0, 0.25); // 0 6px 12px
            animation: ${jelloHorizontal} 1s ease forwards;
        }

        &:active {
            box-shadow: 0 0.1875rem 0.375rem rgba(0, 0, 0, 0.2); // 0 3px 6px
            transform: translateY(1px);
        }

        @media (max-width: 768px) {
            font-size: 0.875rem; // 14px
            padding: 0.5rem 1rem; // 8px 16px
        }

        @media (max-width: 480px) {
            font-size: 0.75rem; // 12px
            padding: 0.375rem 0.875rem; // 6px 14px
        }

        @media (max-width: 344px) {
            font-size: 0.625rem; // 10px 
            padding: 0.25rem 0.75rem; // 4px 12px
        }
    }
`;

const SelectContainer = styled.div`
    margin: 1rem 0; // 16px 0
    display: flex;
    justify-content: right;
    width: 100%;
    animation: ${fadeIn} 1.5s ease forwards;

    label {
        font-size: 1.25rem; // 20px
        margin-right: 0.625rem; // 10px
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

const TableContainer = styled.table`
    width: 90%;
    border-collapse: collapse;
    margin-top: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
    animation: ${fadeIn} 2s ease forwards;

    thead {
        background-color: #282c34;
        color: rgba(214, 230, 245, 0.925);

        th {
            padding: 1rem; // 16px
            text-align: left;
            font-weight: 600;
        }
    }

    tbody {
        tr{
            &:nth-child(even) {
                background-color: #f9f9f9;
            }

            &:hover {
                background-color: #f1f1f1;
            }
        }
        td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;

            /* 글자 수 제한 */
            white-space: nowrap;       /* 줄 바꿈 방지 */
            overflow: hidden;          /* 넘치는 텍스트 숨기기 */
            text-overflow: ellipsis;   /* '...'으로 표시 */
            max-width: 150px;          /* 최대 너비 설정 */

            img {
                width: 50px;
                height: 50px;
            }
        }
    }

    th,
    td {
        text-align: center;
    }

    @media (max-width: 1200px) {
        td:nth-child(n+3), th:nth-child(n+3) { // 분류, 내용 제외 숨김처리
            display: none;
        }
    }
`;

export default Experience;