import { createSlice } from '@reduxjs/toolkit';
import { PaintingState } from '../../../../types/types';

const initialState: PaintingState = {
    paintings: null,
    enabledFilters: null,
    filters: null,
    pages: { currentPage: 1, totalPages: null },
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
        setFilters: (state, action) => {
            state.filters = action.payload;
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
        increasePage: (state) => {
            if (!state.pages || !state.pages.currentPage) return;
            state.pages.currentPage = state.pages.currentPage + 1;
        },
        decreasePage: (state) => {
            if (!state.pages || !state.pages.currentPage) return;
            state.pages.currentPage = state.pages.currentPage - 1;
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
    setFilters,
    addFilter,
    removeFilter,
    setPage,
    setTotalPages,
    increasePage,
    decreasePage,
} = paintingSlice.actions;

export default paintingSlice.reducer;
