import { configureStore } from '@reduxjs/toolkit';
import helpSlice from '../slice/helpSlice';
import adoptSlice from '../slice/adoptSlice';

export const store = configureStore({
  reducer: {
    help: helpSlice,
    adopt: adoptSlice,
  },
});
