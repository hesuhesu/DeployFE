import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import { vibrate1, fadeIn } from '../components/Animation.tsx';
import { authCheck } from '../utils/authCheck.tsx';
import { errorMessage, successMessage } from '../utils/SweetAlertEvent.tsx';
import Spinner from '../components/Spinner.tsx';
import ScrollButton from '../components/DiaryDetail/ScrollButton.tsx';
import 'react-quill/dist/quill.snow.css'; // Quill snow스타일 시트 불러오기
import '../scss/QuillEditor.scss';
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

hljs.configure({
  languages: ["javascript", "python", "java", "cpp"],
});

const HOST = process.env.REACT_APP_HOST;
const PORT = process.env.REACT_APP_PORT;

interface Data {
    title: string;
    content: string;
    realContent: string;
    category: string;
    imgData: string[];
    createdAt: string;
}

const DiaryDetail: React.FC = () => {
    const params = useParams()._id
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
            if (authCheck() === 0){
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
                <HeaderOne>
                    <img src={require(`../assets/images/${data.category.toLowerCase()}.svg`)} alt=""/>
                    <p>{data.title}</p>
                </HeaderOne>
                <HeaderTwo>작성 일시 : {data.createdAt}</HeaderTwo>
                <ButtonContainer>
                    <button onClick={() => navigate(-1)}>돌아가기</button>
                    {admin === 1 && (
                    <>
                        <button onClick={() => navigate(`/quilleditor_update/${params}`, { state: data })}>수정하기</button>
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
                <ScrollButton/>
            </DiaryDetailContainer>
      );
    };

const DiaryDetailContainer = styled.div`
    overflow: hidden;
    background-color: rgba(214, 230, 245, 0.925);
    animation: ${fadeIn} 0.5s ease-in-out;
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
const HeaderTwo = styled.h2`
    display:flex;
    justify-content: right;
    font-size: 20px;
    color: #282c34;
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
    border: 0.625rem ridge #282c34; // 10px
    border-radius: 0.625rem 0.625rem 0 0; // 10px 10px 0 0
    -webkit-user-select:all;
    -moz-user-select:all;
    -ms-user-select:all;
    user-select:all;
`;

export default DiaryDetail;