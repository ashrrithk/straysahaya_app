import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    curUser: null,
    showAuthScreen: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setUser: (state, action) => {
        state.user = action.payload;
      },
      setCurUser: (state, action) => {
          state.curUser = action.payload;
        },
        setShowAuthScreen: (state, action) => {
          state.showAuthScreen = action.payload;
        },
    },
  });
  
  export const { setUser, setCurUser, setShowAuthScreen } = authSlice.actions;
  
  export default authSlice.reducer;