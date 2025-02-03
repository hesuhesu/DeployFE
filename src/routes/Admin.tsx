import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { successMessage } from '../utils/SweetAlertEvent.tsx';
import AdminDiary from '../components/Admin/AdminDiary.tsx';
import AdminUser from '../components/Admin/AdminUser.tsx';

const Admin: React.FC = () => {
  const [user, setUser] = useState<boolean>(false);
  const [diary, setDiary] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    successMessage("관리자님 로그아웃 완료!");
    localStorage.clear();
    navigate(-1);
  }

  return (
    <AdminContainer>
      <Header>DashBoard</Header>
      <Sidebar>
        <h2>메뉴</h2>
        <ul>
          <li onClick={() => setDiary(!diary)}>Diary 관리</li>
          <li onClick={() => setUser(!user)}>User 관리</li>
          <li onClick={() => navigate("/")}>홈으로</li>
          <li onClick={handleLogout}>로그아웃</li>
        </ul>
      </Sidebar>
      <MainContent>
        {diary && <AdminDiary/>}
        {user && <AdminUser/>}
      </MainContent>
    </AdminContainer>
  );
}

const AdminContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr; // Sidebar + Main Content
  grid-template-rows: auto 1fr; // Header + Content
  height: 100vh;
`;

const Header = styled.header`
  grid-column: 1 / -1;
  background-color: #4a90e2;
  color: white;
  padding: 1rem;
  text-align: center;
`;

const Sidebar = styled.aside`
  background-color: #f4f4f4;
  padding: 1rem;
  border-right: 1px solid #ddd;
`;

const MainContent = styled.main`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
`;

export default Admin;