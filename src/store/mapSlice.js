import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userLocation: null,
    cities: [],
    weatherData: [],
    lastFetchTime: null,
    loading: false,
    error: null,
};

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setUserLocation(state, action) {
            state.userLocation = action.payload;
        },
        setCities(state, action) {
            const newCities = action.payload;

            const updatedCities = [
                ...state.cities,
                ...newCities.filter(
                    (newCity) =>
                        !state.cities.some(
                            (existingCity) => existingCity.id === newCity.id
                        )
                ),
            ];

            state.cities = updatedCities;
            state.lastFetchTime = Date.now();
            state.loading = false;
        },
        fetchCitiesRequest(state) {
            state.loading = true;
        },
        fetchCitiesFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchWeatherData() {},
        setWeatherData(state, action) {
            state.weatherData = action.payload;
        },
        setWeatherError(state, action) {
            state.weatherError = action.payload;
        },
        
    },
});

export const { 
    setUserLocation, 
    setCities ,
    fetchCitiesRequest,
    fetchCitiesFailed,
    fetchWeatherData,
    setWeatherData,
    setWeatherError,
} = mapSlice.actions;

export default mapSlice.reducer;
