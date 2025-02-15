import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.bodyBackground};
        color: ${({ theme }) => theme.textColor};
        transition: background-color 0.3s, color 0.3s;
    }
`;