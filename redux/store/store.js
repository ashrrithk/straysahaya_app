import { configureStore } from '@reduxjs/toolkit';
import helpSlice from '../slice/helpSlice';

export const store = configureStore({
  reducer: {
    help: helpSlice,
  },
});
