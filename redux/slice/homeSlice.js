import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   distance: null,
   location: null,
   errorMsg: null,
    helpData: [],
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
      setErrorMsg: (state, action) => {
        state.errorMsg = action.payload;
      },
      setHelpData: (state, action) => {
        state.helpData = action.payload;
      },
    }});

    export const { setDistance, setLocation, setErrorMsg, setHelpData} = homeSlice.actions;

    export default homeSlice.reducer;