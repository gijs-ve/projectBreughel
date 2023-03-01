import { CartState } from '../../../../types/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: CartState = {
    products: {
        paintings: [],
    },
};

export const cartState = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (
            state,
            action: { payload: { type: string; purchaseId: number } },
        ) => {
            const { type, purchaseId } = action.payload;
            if (type === 'painting') {
                state.products = {
                    ...state.products,
                    paintings: [...state.products.paintings, purchaseId],
                };
            }
        },
    },
});

export const { addProduct } = cartState.actions;

export default cartState.reducer;
