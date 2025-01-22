import React, { createContext, useReducer, useContext, ReactNode } from 'react';

interface CategoryState {
    selectedCategory: string;
    currentPage: number;
}

interface Action {
    type: 'SET_CATEGORY' | 'SET_PAGE';
    payload: any;
}

const initialState: CategoryState = {
    selectedCategory: '전체', // 기본 카테고리
    currentPage: 1, // 기본 페이지
};

// 리듀서 정의
const reducer = (state: CategoryState, action: Action): CategoryState => {
    switch (action.type) {
        case 'SET_CATEGORY':
            return { ...state, selectedCategory: action.payload };
        case 'SET_PAGE':
            return { ...state, currentPage: action.payload };
        default:
            return state;
    }
};

// 컨텍스트 생성
const GlobalStateContext = createContext<{ state: CategoryState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <GlobalStateContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

// 컨텍스트 활용 훅
export const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
};