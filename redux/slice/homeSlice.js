import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   distance: null,
   location: null,
   error: null,
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
      setDistance: (state, action) => {
        state.distance = action.payload;
      },
      setLocation: (state, action) => {
        state.location = action.payload;
      },
      setError: (state, action) => {
        state.error = action.payload;
      },
    }});

    export const { setDistance, setLocation, setError} = homeSlice.actions;

    export default homeSlice.reducer;