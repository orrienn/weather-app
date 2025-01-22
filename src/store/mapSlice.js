import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
    name: 'map',
    initialState: {
        userLocation: null,
        cities: [],
    },
    reducers: {
        setUserLocation: (state, action) => {
            state.userLocation = action.payload;
        },
        setCities: (state, action) => {
            state.cities = action.payload;
        }
    }
});

export const { setUserLocation, setCities } = mapSlice.actions;

export default mapSlice.reducer;