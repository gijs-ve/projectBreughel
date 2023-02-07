import { createSlice } from '@reduxjs/toolkit';
import { PaintingState } from '../../../../types/types';

const initialState: PaintingState = {
    paintings: null,
    enabledFilters: null,
    pages: { currentPage: null, totalPages: null },
};

export const paintingSlice = createSlice({
    name: 'paintings',
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
        setPage: (state, action) => {
            if (!state.pages) return;
            state.pages.currentPage = action.payload;
        },
        setTotalPages: (state, action) => {
            if (!state.pages) return;
            state.pages.totalPages = action.payload;
        },
    },
});

export const {
    setPaintings,
    resetFilters,
    addFilter,
    removeFilter,
    setPage,
    setTotalPages,
} = paintingSlice.actions;

export default paintingSlice.reducer;
