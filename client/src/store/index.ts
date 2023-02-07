import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userState/slice';
import paintingReducer from './paintingState/slice';

const store = configureStore({
    reducer: {
        userState: userReducer,
        paintingState: paintingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export * from './userState';
export * from './paintingState';
export default store;
