import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Diary from '../routes/Diary.tsx';
import axios from 'axios';

jest.mock('axios');

describe('Diary Component', () => {
    const mockData = {
        data: {
            list: [
                {
                    _id: '1',
                    title: '첫 번째 일기',
                    content: '일기 내용 1',
                    category: 'React',
                    createdAt: '2022-01-01',
                },
                {
                    _id: '2',
                    title: '두 번째 일기',
                    content: '일기 내용 2',
                    category: 'NodeJS',
                    createdAt: '2022-01-02',
                },
            ],
        },
    };

    beforeEach(() => {
        (axios.get as jest.Mock).mockResolvedValue(mockData);
    });

    test('renders Diary component and fetches data', async () => {
        render(
            <MemoryRouter>
                <Diary />
            </MemoryRouter>
        );

        expect(screen.getByText(/카테고리 선택/i)).toBeInTheDocument();
        expect(screen.getByText(/게시물 작성하기/i)).toBeInTheDocument();

            expect(screen.getByText('첫 번째 일기')).toBeInTheDocument();
            expect(screen.getByText('두 번째 일기')).toBeInTheDocument();
        
    });

    test('changes category and filters data', async () => {
        render(
            <MemoryRouter>
                <Diary />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('첫 번째 일기')).toBeInTheDocument();
        });

        const select = screen.getByLabelText(/카테고리 선택/i);
        fireEvent.change(select, { target: { value: 'NodeJS' } });

            expect(screen.getByText('두 번째 일기')).toBeInTheDocument();
            expect(screen.queryByText('첫 번째 일기')).not.toBeInTheDocument();
    });

    test('displays "No Data" when no diary entries are available', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: { list: [] } });

        render(
            <MemoryRouter>
                <Diary />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/No Data/i)).toBeInTheDocument();
        });
    });
});