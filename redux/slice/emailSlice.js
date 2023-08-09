import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAvailable: false,
    recipients: [],
    subject: undefined,
    body: undefined,
    email: undefined,
};

const emailSlice = createSlice({
    name: 'email',
    initialState,
    reducers: {
      setisAvailable: (state, action) => {
        state.isAvailable = action.payload;
      },
      setRecepients: (state, action) => {
          state.recipients = action.payload;
        },
        setSubject: (state, action) => {
          state.subject = action.payload;
        },
        setBody: (state, action) => {
            state.body = action.payload;
            },
        setEmail: (state, action) => {
            state.email = action.payload;
            },
        
    },
  });
  
  export const {setisAvailable, setRecepients, setSubject, setBody, setEmail } = emailSlice.actions;
  
  export default emailSlice.reducer;