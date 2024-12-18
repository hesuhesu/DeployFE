import React from 'react';
import { render, screen } from '@testing-library/react';
import DiaryDetail from '../routes/DiaryDetail.tsx';

describe('MyComponent', () => {
  test('Title 확인', () => {
    render(<DiaryDetail />);
    
    // 타이틀이 제대로 렌더링되는지 확인
    const titleElement = screen.getByText(/hello, world!/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('Category 확인', () => {
    render(<DiaryDetail/>);
    
    // 버튼이 렌더링되는지 확인
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('Content 확인', () => {
    render(<DiaryDetail/>);
    
    // 버튼이 렌더링되는지 확인
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });
});