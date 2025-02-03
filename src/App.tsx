import React from 'react';
import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalStateProvider } from './utils/GlobalState.tsx';
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./routes/Home.tsx";
import About from './routes/About.tsx';
import Project from './routes/Project.tsx';
import Diary from './routes/Diary.tsx';
import DiaryDetail from './routes/DiaryDetail.tsx';
import QuillEditor from "./routes/QuillEditor.tsx";
import QuillEditorUpdate from "./routes/QuillEditorUpdate.tsx";
import AuthPage from "./routes/AuthPage.tsx";
import Admin from "./routes/Admin.tsx";
import Callback from './routes/Callback.tsx';
import PrivateRoute from './utils/PrivateRoute.tsx';
import { ADMIN_PAGE } from './utils/Variable.tsx';

import './scss/QuillEditor.scss';
import 'katex/dist/katex.min.css'; // formular 활성화
import 'react-quill/dist/quill.snow.css'; // Quill snow스타일 시트 불러오기
import "highlight.js/styles/github.css";

const queryClient = new QueryClient();

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStateProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/project" element={<Project />} />
              <Route path="/diary" element={<Diary/>} />
              <Route path="/diary_detail/:_id" element={<DiaryDetail/>} />
              <Route element={<PrivateRoute/>}>
                <Route path="/quill_editor" element={<QuillEditor/>} />
                <Route path="/quill_editor_update/:_id" element={<QuillEditorUpdate/>} />
              </Route>
            </Route>
            <Route element={<PrivateRoute/>}>
              <Route path={`/${ADMIN_PAGE}`} element={<Admin />} />
            </Route>
            <Route path="/authpage" element={<AuthPage/>} />
            <Route path="/oauth" element={<Callback />} />
          </Routes>
        </QueryClientProvider>
      </GlobalStateProvider>
    </BrowserRouter>
  );
}

export default App;