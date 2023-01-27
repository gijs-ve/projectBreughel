import { createSlice } from '@reduxjs/toolkit';
import { PaintingState } from '../../../../types/types';

const initialState: PaintingState = {
    paintings: null,
};

export const paintingSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setPaintings: (state, action) => {
            state.paintings = action.payload;
        },
    },
});

export const { setPaintings } = paintingSlice.actions;

export default paintingSlice.reducer;
