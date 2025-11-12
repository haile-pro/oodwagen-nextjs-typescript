
import { configureStore } from '@reduxjs/toolkit';
import foodsReducer from './foodsSlice';

export const store = configureStore({
  reducer: {
    foods: foodsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
