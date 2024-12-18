import React from 'react';
import { render, screen } from '@testing-library/react';
import PictureSlide from '../components/Project/PictureSlide.tsx';

describe('MyComponent', () => {
  test('Title 확인', () => {
    const picture:string[] = ['picture', 'pictures'];
    render(<PictureSlide pictures={picture}/>);
    
    const titleElement = screen.getByText(/hello, world!/i);
    expect(titleElement).toBeInTheDocument();
  });
});