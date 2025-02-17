import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    position: fixed;
    bottom: 20px;
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

export const CenterButton = ({ onClick }) => {
    return (
        <Button onClick={onClick}>
            📍
        </Button>
    );
};