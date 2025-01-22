import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
    name: 'map',
    initialState: {
        userLocation: null
    },
    reducers: {
        setUserLocation: (state, action) => {
            state.userLocation = action.payload;
        }
    }
});

export const { setUserLocation } = mapSlice.actions;

export default mapSlice.reducer;