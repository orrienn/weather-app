import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    nameFilter: '',
    populationRange: [0, Infinity],
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setNameFilter(state, action) {
            state.nameFilter = action.payload;
        },
        setPopulationRange(state, action) {
            state.populationRange = action.payload;
        },
    },
});

export const { setNameFilter, setPopulationRange } = filterSlice.actions;
export default filterSlice.reducer;