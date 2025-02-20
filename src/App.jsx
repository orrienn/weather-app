import React from 'react'
import { MapComponent } from './components'
import { mapConfig } from './config'
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './components/GlobalStyles';

export const App = () => {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    return (
        <StyledThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <GlobalStyles />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <MapComponent {...mapConfig}/>
            </div>
        </StyledThemeProvider>
    );
}