import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import DiaryDetailHeader from '../components/DiaryDetail/DiaryDetailHeader.tsx';
import ScrollButton from '../components/DiaryDetail/ScrollButton.tsx';
import Comment from '../components/DiaryDetail/Comment.tsx';
import { vibrate1, fadeIn } from '../utils/Animation.tsx';
import { authCheck } from '../utils/authCheck.tsx';
import { errorMessage, successMessage } from '../utils/SweetAlertEvent.tsx';
import Spinner from '../utils/Spinner.tsx';
import { HOST, PORT } from '../utils/Variable.tsx';
import hljs from "highlight.js";

hljs.configure({
  languages: ["javascript", "python", "java", "cpp"],
});

interface Data {
    title: string;
    content: string;
    realContent: string;
    category: string;
    imgData: string[];
    createdAt: string;
}

const DiaryDetail: React.FC = () => {
    const params:string | undefined = useParams()._id 
    const [admin, setAdmin]= useState<Number>(0);
    const navigate = useNavigate();
    const [data, setData] = useState<Data>({
        title: '',
        content: '',
        realContent: '',
        category: '',
        imgData: [],
        createdAt: ''
    });
    const [isLoading, setIsLoading] = useState<Boolean>(true); // 로딩 상태 관리
    
    useEffect(() => {
        window.scrollTo(0,0);
        let timeoutId: NodeJS.Timeout;
        axios.get(`${HOST}:${PORT}/diary/read_detail`, {
            params: { _id: params }
        }).then((response) => {
            setData(response.data.list);
            if (authCheck() !== 1){
                return;
            }
            setAdmin(1);
        }).catch((error) => { console.error(error); })
        .finally(() => {
            timeoutId = setTimeout(() => setIsLoading(false), 500);
          });
        return () => {
            clearTimeout(timeoutId);
        };
    }, [params]);

    const modules = useMemo(() => ({
        syntax: {
            highlight: (text: string) => hljs.highlightAuto(text).value,
        },
        toolbar: false,
    }), []);

    if (isLoading) {
        return <Spinner/>;
    }

    const handleDelete = () => {
        if (data.imgData.length > 0) {
            axios.delete(`${HOST}:${PORT}/delete_files`, {
              params: {
                imgData: data.imgData
              }
            }).then((response) => { }).catch((error) => { errorMessage("삭제 실패"); })
          }
          axios.delete(`${HOST}:${PORT}/diary/delete`, {
            params: { _id: params }
          }).then((response) => {
            successMessage("게시물이 삭제되었습니다!");
            navigate('/diary');
          }).catch((error) => { errorMessage("삭제 실패"); })
    }

    return (
            <DiaryDetailContainer>
                <DiaryDetailHeader data={data}/>
                <ButtonContainer>
                    <button onClick={() => navigate('/diary')}>돌아가기</button>
                    {admin === 1 && (
                    <>
                        <button onClick={() => navigate(`/quill_editor_update/${params}`, { state: data })}>수정하기</button>
                        <button onClick={handleDelete}>삭제하기</button>
                    </>
                    )}
                </ButtonContainer>
                <QuillContainer>
                    <ReactQuill
                    theme="snow"
                    value={data.realContent}
                    readOnly={true}
                    modules={modules}
                    />
                </QuillContainer>
                <Comment params={params}/>
                <ScrollButton navigate={navigate}/>
            </DiaryDetailContainer>
      );
    };

const DiaryDetailContainer = styled.div`
    overflow: hidden;
    background-color: rgba(214, 230, 245, 0.925);
    animation: ${fadeIn} 0.5s ease-in-out;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
`;

const ButtonContainer = styled.div`
    display:flex;
    justify-content: right;

    button {
        margin-top: 10px;
        margin-bottom: 10px;
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
            animation: ${vibrate1} 0.3s ease infinite;
        }

        &:active {
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
            transform: translateY(1px);
        }
    }
`;

const QuillContainer = styled.div`
    border: 0.3rem solid #282c34; // 10px
    border-radius: 0.3rem;
    -webkit-user-select:all;
    -moz-user-select:all;
    -ms-user-select:all;
    user-select:all;
`;

export default DiaryDetail;