import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';
import styled from 'styled-components';

const Button = styled.button`
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: ${({ theme }) => theme.buttonBackground};
    color: ${({ theme }) => theme.buttonText};
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 1000;

    &:hover {
        background-color: ${({ theme }) => theme.buttonHover};
    }
`;

export const ThemeToggleButton = () => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    return (
        <Button onClick={handleToggleTheme}>
            {isDarkMode ? '🌞' : '🌙'} {/* Ikona zależna od trybu */}
        </Button>
    );
};