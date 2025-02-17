import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
`;

const LoadingBarContainer = styled.div`
    width: 100%;
    height: 4px;
    background-color: #e0e0e0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    overflow: hidden;
    margin-top: 10px; // Odstęp od mapy
`;

const LoadingBar = styled.div`
    width: 100%;
    height: 100%;
    background-color: #007bff;
    animation: ${loadingAnimation} 1.5s infinite;
`;

export const LoadingBarComponent = () => {
    return (
        <LoadingBarContainer>
            <LoadingBar />
        </LoadingBarContainer>
    );
};