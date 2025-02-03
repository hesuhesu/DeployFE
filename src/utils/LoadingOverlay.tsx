import React from 'react';
import styled from 'styled-components';

const LoadingOverlay = React.memo(() => {
    return (
        <LoadingOverlayContainer>
                    <LoadingText>댓글 작성 중...</LoadingText>
        </LoadingOverlayContainer>
    );
});

export default LoadingOverlay;

const LoadingOverlayContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000; // 다른 요소보다 위에 표시
`;

const LoadingText = styled.div`
    color: rgba(214, 230, 245, 0.925);
    font-size: 1.5rem;
    transition: opacity 0.25s ease, transform 0.25s ease;
`;