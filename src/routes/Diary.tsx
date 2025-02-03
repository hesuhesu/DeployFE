import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../utils/GlobalState.tsx';
import axios from 'axios';
import styled from 'styled-components';
import { authCheck } from '../utils/authCheck.tsx';
import { fadeIn, jelloHorizontal } from '../utils/Animation.tsx';
import Spinner from '../utils/Spinner.tsx';
import Pagination from '../components/Diary/Pagination.tsx';
import { CategoryList, HOST, PORT } from '../utils/Variable.tsx';
import SelectCategory from '../components/Diary/SelectCategory.tsx';

const ITEMS_PER_PAGE = 10;

interface API {
    _id: string;
    title: string;
    content: string;
    category: string;
    createdAt: string;
}

const Diary: React.FC = () => {
    const [api, setApi] = useState<API[]>([]);
    const [status, setStatus] = useState<boolean>(false); // 관리자 인증
    const { state, dispatch } = useGlobalState();
    const { selectedCategory, currentPage } = state;
    const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 관리
    const [totalPages, setTotalPages] = useState<number>(1); // 전체 페이지 수
    const [totalItems, setTotalItems] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        setIsLoading(true);
        (async () => {
            try {
                // const response = await axios.get(`${HOST}:${PORT}/diary/all_read`);
                const response = await axios.get(`${HOST}:${PORT}/diary/one_page_read`, {
                    params: { page: currentPage, limit: ITEMS_PER_PAGE, category: selectedCategory },
                });
                setApi(response.data.list);
                setTotalPages(response.data.totalPages); // 전체 페이지 수 업데이트
                setTotalItems(response.data.totalItems);
            } catch (error) {
                console.error(error);
            }
            finally {
                timeoutId = setTimeout(() => setIsLoading(false), 500);
            } 
        })();
        if (authCheck() !== 1){ return; }
        setStatus(true);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [currentPage, selectedCategory]);

    const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: 'SET_CATEGORY', payload: event.target.value });
        dispatch({ type: 'SET_PAGE', payload: 1 });
    };

    const handlePageChange = (page: number) => {
        dispatch({ type: 'SET_PAGE', payload: page });
    };

    if (isLoading) {
        return <Spinner/>;
    }

    return (
        <DiaryContainer>
            <ButtonContainer>
                {status && <button onClick={() => navigate("/quill_editor")} aria-label="게시물 작성">게시물 작성하기</button>} 
            </ButtonContainer>
            <SelectCategory
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                categories={CategoryList}
            />
            <h2>{selectedCategory}({totalItems})</h2>
            <CardsContainer>
                {api.length > 0 ? (
                    api.map((item) => (
                        <Card key={item._id} onClick={() => navigate(`/diary_detail/${item._id}`)}>
                            <CardImage src={require(`../assets/images/${item.category.toLowerCase()}.svg`)} alt={item.title} />
                            <CardContent>
                                <h2>{item.title}</h2>
                                <small>{item.createdAt}</small>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div>No Data</div>
                )}
            </CardsContainer>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </DiaryContainer>
    );
};

const DiaryContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column; // 세로 방향으로 정렬
    align-items: center; // 가로 중앙 정렬
    background-color: rgba(214, 230, 245, 0.925);
    color: #282c34;

    h2 {
        font-size: 40px;
    }
`;

const ButtonContainer = styled.div`
    height: 10vh;
    display: flex;
    align-items: center;
    
    animation: ${fadeIn} 1.0s ease forwards;
    button {
        margin-top: 1rem; 
        margin-bottom: 1rem; 
        padding: 0.5rem 1rem;
        background-color: #282c34;
        border: none;
        border-radius: 0.625rem;
        color: white;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);

        &:hover {
            box-shadow: 0 0.375rem 0.75rem rgba(0, 0, 0, 0.25);
            animation: ${jelloHorizontal} 1s ease forwards;
        }

        &:active {
            box-shadow: 0 0.1875rem 0.375rem rgba(0, 0, 0, 0.2);
            transform: translateY(1px);
        }

        @media (max-width: 768px) {
            font-size: 0.875rem; 
            padding: 0.5rem 1rem;
        }

        @media (max-width: 480px) {
            font-size: 0.75rem; 
            padding: 0.375rem 0.875rem;
        }

        @media (max-width: 344px) {
            font-size: 0.625rem;
            padding: 0.25rem 0.75rem;
        }
    }
`;

const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem; /* 카드 간격 */
    width: 100%;
    max-width: 80vw; /* 컨테이너 최대 너비 */
    margin: 0 auto; /* 가운데 정렬 */
    padding: 1rem;

    @media (max-width: 1200px) {
        grid-template-columns: 1fr
    }
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

const CardImage = styled.img`
    width: 15vw; /* 이미지 크기 */
    object-fit: cover;
    margin-bottom: 1rem;
`;

const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h2 {
        font-size: 1.2rem;
        font-weight: bold;
        padding: 0.5rem;
        margin-bottom: 10px;

        /* 글자 수 제한 */
        white-space: nowrap;       /* 줄 바꿈 방지 */
        overflow: hidden;          /* 넘치는 텍스트 숨기기 */
        text-overflow: ellipsis;   /* '...'으로 표시 */
        max-width: 35vw;

        @media (max-width: 1200px) {
            max-width: 60vw;  
        }

        @media (max-width: 960px) {
            font-size: 1.0rem;
        }

        @media (max-width: 780px) {
            font-size: 0.9rem;
            max-width: 70vw;
        }

        @media (max-width: 600px) {
            font-size: 0.75rem; 
            max-width: 75vw;
        }
    }

    small {
        font-size: 0.875rem;

        @media (max-width: 960px) {
            font-size: 0.7rem;
        }
    }
`;

export default Diary;