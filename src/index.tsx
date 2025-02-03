import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/index.scss';
import App from './App.tsx';

const rootElement = document.getElementById('root');

// rootElement가 null일 가능성을 TypeScript가 경고하므로 이를 처리해야 합니다.
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <React.StrictMode>는 필요에 따라 주석을 제거하거나 추가할 수 있습니다.
      <App />
  );
}