import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    image: null,
    name: null,
    center: null,
    phone: null,
    animalType: null,
    about: null,
    adopt: null,
    adoptData: [],

};

const adoptSlice = createSlice({
  name: 'adopt',
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setName: (state, action) => {
        state.name = action.payload;
      },
      setCenter: (state, action) => {
        state.center = action.payload;
      },
      setPhone: (state, action) => {
        state.phone= action.payload;
      },
    setAnimalType: (state, action) => {
      state.animalType = action.payload;
    },
    setAbout: (state, action) => {
      state.about = action.payload;
    },
    setAdoption: (state, action) => {
        state.adopt = action.payload;
      },
      setAdoptData: (state, action) => {
        state.adoptData = action.payload;
      },
  
  },
});

export const { setImage, setName, setCenter, setPhone, setAnimalType, setAbout, setAdoption, setAdoptData } = adoptSlice.actions;

export default adoptSlice.reducer;