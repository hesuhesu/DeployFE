import React, { useState, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { styled } from 'styled-components';
import ReactQuill, { Quill } from 'react-quill';
import EditorToolBar, { undoChange, redoChange, insertHeart, formats } from '../components/EditorToolBar.tsx';
import axios from 'axios';
import { errorMessage, successMessage } from '../utils/SweetAlertEvent.tsx';
import { authCheck } from '../utils/authCheck.tsx';
import Button from '../components/QuillEditor/Button.tsx';
import hljs from "highlight.js";
import { CategoryList, HOST, PORT } from '../utils/Variable.tsx';

hljs.configure({
  languages: ["javascript", "python", "java", "cpp"],
});

const QuillEditor: React.FC = () => {
    const [editorHtml, setEditorHtml] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>(CategoryList[0]);
    const [imgData, setImgData] = useState<string[]>([]); // 이미지 배열
    const quillRef = useRef<ReactQuill | null>(null); // Ref 타입 설정
    const navigate = useNavigate();
    
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };
    
    // 이미지 처리를 하는 핸들러
    const imageHandler = () => {
        // 1. 이미지를 저장할 input type=file DOM을 만든다.
        const input = document.createElement('input');
        // 속성 써주기
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*'); // 원래 image/*
        input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.

        input.addEventListener('change', async () => {
            const file = input.files?.[0];
            if (!file) return; // 파일이 선택되지 않은 경우

            const formData = new FormData();
            formData.append('img', file); // formData는 키-밸류 구조
            try {
                const result = await axios.post(`${HOST}:${PORT}/img`, formData);
                console.log('성공 시, 백엔드가 보내주는 데이터', result.data.url);
                setImgData(prevFiles => [...prevFiles, result.data.realName]);
                const IMG_URL = result.data.url;
                // 이미지 태그를 에디터에 써주기 - 여러 방법이 있다.
                const editor = quillRef.current?.getEditor(); // 에디터 객체 가져오기
                if (!editor) return; // editor가 없으면 함수 종료
                // 현재 에디터 커서 위치값을 가져온다
                const range = editor.getSelection();
                if (range) { // range가 null이 아닌 경우에만 이미지 삽입
                    editor.insertEmbed(range.index, 'image', IMG_URL);
                }
            } catch (error) { console.log('이미지 불러오기 실패'); }
        }, { once: true });
    };
    //dnd 처리 핸들러
    const imageDropHandler = useCallback(async (dataUrl) => {
        try {
            // dataUrl을 이용하여 blob 객체를 생성
            const blob = await fetch(dataUrl).then(res => res.blob());
            // FormData 객체를 생성하고 'img' 필드에 blob을 추가
            const formData = new FormData();
            formData.append('img', blob);
            // FormData를 서버로 POST 요청을 보내 이미지 업로드를 처리
            const result = await axios.post(`${HOST}:${PORT}/img`, formData);
            console.log('성공 시, 백엔드가 보내주는 데이터', result.data.url);
            setImgData(prevFiles => [...prevFiles, result.data.realName]);

            // 서버에서 반환된 이미지 URL을 변수에 저장
            const IMG_URL = result.data.url;
            // Quill 에디터 인스턴스를 호출
            const editor = quillRef.current?.getEditor(); // 에디터 객체 가져오기
            if (!editor) return; // editor가 없으면 함수 종료
            // 현재 에디터 커서 위치값을 가져온다
            const range = editor.getSelection();
            if (range) { // range가 null이 아닌 경우에만 이미지 삽입
                editor.insertEmbed(range.index, 'image', IMG_URL);
            }
        } catch (error) { console.log('이미지 업로드 실패', error); }
    }, []);

    // 에디터 내용 변경 핸들러
    const handleChange = useCallback((html: string) => {
        setEditorHtml(html);
    }, []);

    const modules = useMemo(() => ({
        syntax: {
            highlight: text => hljs.highlightAuto(text).value,
          },
        toolbar: {
            container: "#toolbar",
            syntax: true,
            handlers: {
                "undo": undoChange,
                "redo": redoChange,
                "image": imageHandler,
                insertHeart: insertHeart,
            },
        },
        // undo, redo history
        history: {
            delay: 500,
            maxStack: 100,
            userOnly: true
        },
        // image resize 추가
        ImageResize: { parchment: Quill.import('parchment') },
        imageDropAndPaste: { handler: imageDropHandler },
    }), [imageDropHandler]);

    const handleSubmit = async () => {
        if (authCheck() === 0) {
            errorMessage("잘못된 접근!");
            return;
        }

        if (selectedCategory === '전체'){
            errorMessage("분류를 제대로 설정하세요!");
            return;
        }

        if (title.length > 50){
            errorMessage("제목은 50자리 이하입니다..");
            return;
        }
        
        const description = quillRef.current?.getEditor().getText(); //태그를 제외한 순수 text만을 받아온다. 검색기능을 구현하지 않을 거라면 굳이 text만 따로 저장할 필요는 없다.
        // description.trim()
        axios.post(`${HOST}:${PORT}/diary/write`, {
            title: title,
            content: description,
            realContent: editorHtml,
            category: selectedCategory,
            imgData: imgData
        }).then((res) => {
            successMessage("저장되었습니다!");
            navigate("/diary");
        }).catch((e) => { errorMessage("에러!!"); });
    };

    const handleCancel = async () => {
        if (imgData.length > 0) {
            axios.delete(`${HOST}:${PORT}/delete_files`, {
                params: {
                    imgData: imgData
                }
            }).then((response) => { }).catch((error) => { errorMessage("에러!!"); });
        }
        navigate('/diary');
    }

    return (
        <QuillEditorContainer>
            <CustomInput type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
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
            <EditorToolBar/>
            <ReactQuill
                theme="snow"// 테마 설정 (여기서는 snow를 사용)
                value={editorHtml}
                onChange={handleChange}
                ref={quillRef}
                modules={modules}
                formats={formats}
                style={{height: '60vh'}}
            />
            <Button onSave={handleSubmit} onCancel={handleCancel} />
        </QuillEditorContainer>
    )
}

const QuillEditorContainer = styled.div`
display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    background-color:rgba(214, 230, 245, 0.925);
`;

const CustomInput = styled.input`
    background-color: #c4c4c4;
    border: none;
    padding: 12px 0 12px 5px;
    margin: 8px 0 8px 0;
    width: 60vw;

    @media (max-width: 1200px) {
        width: 100vw;
    }
`;

const SelectContainer = styled.div`
    margin: 20px 0;
    display: flex;
    align-items: center;

    label {
        margin-right: 10px;
        font-weight: bold;
    }

    select {
        padding: 5px 10px;
        font-size: 16px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
`;

export default QuillEditor;