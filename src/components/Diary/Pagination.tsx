import React, { useState } from "react";
import styled from 'styled-components';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const MAX_VISIBLE_PAGES:number = 10; // 한 번에 보여줄 페이지 수
    const [startPage, setStartPage] = useState<number>(1); // 현재 페이지 그룹의 시작 페이지

    // 현재 페이지 그룹 계산
    const endPage:number = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPages);

    // 페이지 번호 배열 생성
    const pages:number[] = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    // 페이지 이동 핸들러
    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return; // 범위 초과 방지
        onPageChange(page); // 상위 컴포넌트에 페이지 변경 알림

        // 새로운 페이지 그룹 계산
        if (page === endPage && endPage < totalPages) {
            setStartPage(startPage + MAX_VISIBLE_PAGES);
        } else if (page === startPage && startPage > 1) {
            setStartPage(Math.max(1, startPage - MAX_VISIBLE_PAGES));
        }
    };

    return (
        <PaginationContainer>
            {/* 이전 버튼 */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                이전
            </button>

            {/* 페이지 번호 */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    style={{
                        color: currentPage === page ? "white" : "#282c34",
                        backgroundColor: currentPage === page ? "#007BFF" : "white",
                    }}
                >
                    {page}
                </button>
            ))}

            {/* 다음 버튼 */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                다음
            </button>
        </PaginationContainer>
    );
};

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;

    button {
        margin: 0 5px;
        padding: 10px 10px;
        background-color: #282c34;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:disabled {
            background-color: #ddd;
            cursor: not-allowed;
        }

        &:hover {
            background-color: #ddd;
        }
    }
`;

export default Pagination;