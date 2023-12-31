import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  image: null,
  name: null,
  location: null,
  phone: null,
  animalType: null,
  category: null,
  comments: null,
};

const helpSlice = createSlice({
  name: "help",
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setAnimalType: (state, action) => {
      state.animalType = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const {
  setImage,
  setName,
  setLocation,
  setPhone,
  setAnimalType,
  setCategory,
  setComments,
} = helpSlice.actions;

export default helpSlice.reducer;
