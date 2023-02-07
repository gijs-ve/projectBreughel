import { createSlice } from '@reduxjs/toolkit';
import { PaintingState } from '../../../../types/types';

const initialState: PaintingState = {
    paintings: null,
    enabledFilters: null,
};

export const paintingSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setPaintings: (state, action) => {
            state.paintings = action.payload;
        },
        resetFilters: (state, action) => {
            state.enabledFilters = null;
        },
        addFilter: (state, action) => {
            if (!state.enabledFilters) {
                state.enabledFilters = [...action.payload];
            }
            state.enabledFilters = [...state.enabledFilters, ...action.payload];
        },
        removeFilter: (state, action) => {
            const newFilters = state.enabledFilters?.filter((i) => {
                return i !== action.payload;
            });
            state.enabledFilters = newFilters;
        },
    },
});

export const { setPaintings, resetFilters, addFilter, removeFilter } =
    paintingSlice.actions;

export default paintingSlice.reducer;
