import { configureStore } from "@reduxjs/toolkit";
import helpSlice from "../slice/helpSlice";
import adoptSlice from "../slice/adoptSlice";
import authSlice from "../slice/authSlice";
import homeSlice from "../slice/homeSlice";
import emailSlice from "../slice/emailSlice";

export const store = configureStore({
  reducer: {
    help: helpSlice,
    adopt: adoptSlice,
    auth: authSlice,
    home: homeSlice,
    email: emailSlice,
  },
});
