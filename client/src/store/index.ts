import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userState/slice';

const store = configureStore({
    reducer: {
        userState: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export * from './userState';
export * from './paintingState';
export default store;
