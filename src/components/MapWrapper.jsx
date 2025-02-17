import styled from 'styled-components';

export const MapWrapper = styled.div`
    width: 100%;
    height: 650px;
    border: 2px solid #ccc;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    background-color: ${({ theme }) => theme.bodyBackground};
`;