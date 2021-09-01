
import { configureStore } from '@reduxjs/toolkit';
import credentialsSlice from '../Pages/Login/credentialsSlice';

export const store = configureStore({
  reducer: {
    credentials: credentialsSlice,
  },
});