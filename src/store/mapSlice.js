import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userLocation: null,
    cities: [],
    lastFetchTime: null,
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
                    (newCity) => !state.cities.some((existingCity) => existingCity.id === newCity.id)
                ),
            ];
        
            state.cities = updatedCities;
            state.lastFetchTime = Date.now();
        },
        
    },
});

export const { setUserLocation, setCities } = mapSlice.actions;
export default mapSlice.reducer;
