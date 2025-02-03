import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { HOST, PORT } from '../../utils/Variable.tsx';
import { errorMessage } from '../../utils/SweetAlertEvent.tsx';
import LoadingOverlay from '../../utils/LoadingOverlay.tsx';
import { refreshAccessToken } from '../../api/Comment.tsx';

interface Props {
    params: string | undefined;
}

interface Comments {
    username: string;
    content: string;
    createdAt: string; // 또는 Date
}

const Comment: React.FC<Props> = ({ params }) => {
    const [comments, setComments] = useState<Comments[]>([]);
    const [content, setContent] = useState<string>(''); // textarea 내용 관리
    const [deletedIndices, setDeletedIndices] = useState<number[]>([]); // 삭제된 댓글 인덱스 관리
    const [loadingMessage, setLoadingMessage] = useState<boolean>(false); // 댓글 작성 중 메시지 상태 관리

    useEffect(() => {
        axios.get(`${HOST}:${PORT}/diary/comments`, {
            params: { diaryId: params } // params에 diaryId를 사용
        }).then((response) => {
            setComments(response.data.comments); // 댓글 배열을 상태에 저장
        }).catch((error) => {
            console.error(error);
        })
    }, [params]);

    const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 기본 동작 방지
        const token = localStorage.getItem('accessToken');
        if (!token) {
            errorMessage("로그인 해주세요");
            return;
        }

        setLoadingMessage(true); // 댓글 작성 중 메시지 표시

        try {
            const response = await axios.post(`${HOST}:${PORT}/diary/add_comment`, {
                diaryId: params,
                content: content
            }, {
                headers: {
                    'Authorization': token
                }
            });

            // 500ms 후 메시지 숨기기
            setTimeout(() => {
                setComments([...comments, {
                    username: response.data.username,
                    content: content,
                    createdAt: new Date().toISOString()
                }]);
                setContent(''); // textarea 초기화
                setLoadingMessage(false);
            }, 500);
        } catch (error) {
            if (error.response.status === 403) {
                // Access Token이 만료된 경우 Refresh Token으로 재발급
                const refreshResult = await refreshAccessToken();
                if (refreshResult) {
                    return handleAddComment(e);
                } else {
                    localStorage.clear();
                }
            }
            const { message } = error.response.data;
            setLoadingMessage(false); // 에러 발생 시 메시지 숨기기
            errorMessage(message);
        }
    }

    const handleDeleteComment = async (index: number, username: string) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            errorMessage("로그인 해주세요");
            return;
        }

        try {
            await axios.delete(`${HOST}:${PORT}/diary/delete_comment`, {
                data: { // data 속성 사용
                    diaryId: params,
                    index: index,
                },
                headers: {
                    'Authorization': token
                }
            });
            // 삭제된 댓글 인덱스를 상태에 추가
            setDeletedIndices((prev) => [...prev, index]);
            // 댓글 삭제 후 상태 업데이트
            setTimeout(() => {
                setComments((prevComments) => prevComments.filter((_, i) => i !== index)); // 인덱스를 사용하여 필터링
                setDeletedIndices((prev) => prev.filter((i) => i !== index)); // 삭제된 인덱스 제거
            }, 300); // 애니메이션 시간과 일치시킴
        } catch (error) {
            if (error.response.status === 403) {
                // Access Token이 만료된 경우 Refresh Token으로 재발급
                const refreshResult = await refreshAccessToken();
                if (refreshResult) {
                    return handleDeleteComment(index, username);
                } else {
                    localStorage.clear();
                }
            }
            const { message } = error.response.data;
            errorMessage(message);
            setLoadingMessage(false);
        }
    };

    return (
        <CommentContainer>
            <h2>Comment</h2>
            {loadingMessage &&  <LoadingOverlay/>}
            <CommentList>
                {comments.map((comment, index) => (
                    <CommentItem
                        key={index}
                        isDeleted={deletedIndices.includes(index)} // 삭제 여부에 따라 스타일 적용
                    >
                        <strong>{comment.username}</strong>
                        <p>{comment.content}</p>
                        <small>{new Date(comment.createdAt).toLocaleString()}</small>
                        <button onClick={() => handleDeleteComment(index, comment.username)}>❌</button>
                    </CommentItem>
                ))}
            </CommentList>
            
            <form onSubmit={handleAddComment}>
                <label htmlFor="content">내용 입력:</label>
                <textarea
                    id="content" // label과 연결
                    value={content}
                    onChange={(e) => setContent(e.target.value)} // textarea 내용 반영
                    required
                />
                <button>등록하기</button>
            </form>
        </CommentContainer>
    );
};

export default Comment;

const CommentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    margin-bottom: 5rem;
    width: 30vw;
    flex-direction: column;

    h2 {
        font-size:2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center; 
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center; 

        textarea {
            margin: 1rem 0 1rem 0;
            width: 30vw;
            min-height: 15vh;
        }
    }

    button {
        background-color: #282c34;
        color: rgba(214, 230, 245, 0.925);
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
        margin-top: 5px;

        &:hover {
            background-color: darkred;
        }
    }
`;

const CommentList = styled.div`
    margin-top: 1rem;
    width: 100%;
`;

const CommentItem = styled.div<{ isDeleted: boolean }>`
    border: 2px solid #ccc;
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
    transition: opacity 0.3s ease, transform 0.3s ease;
    opacity: ${props => props.isDeleted ? 0 : 1};
    transform: ${props => props.isDeleted ? 'translateY(-2rem)' : 'translateY(0)'};
`;