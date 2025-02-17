import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    weatherData: {},
    loading: false,
    error: null,
    lastFetchTime: null,
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        fetchWeatherData(state) {
            state.loading = true;
            state.error = null;
        },
        fetchWeatherSuccess(state, action) {
            console.log("Weather data saved in state:", action.payload);
            action.payload.forEach((weather) => {
                state.weatherData[weather.id] = weather;
            });
            state.loading = false;
            state.lastFetchTime = Date.now();
        },
        fetchWeatherFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { 
    fetchWeatherData, 
    fetchWeatherSuccess, 
    fetchWeatherFailed 
} = weatherSlice.actions;
export default weatherSlice.reducer;