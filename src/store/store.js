import { configureStore } from "@reduxjs/toolkit";
import  userReducer from "./slices/userSlice"
import companyReducer from './slices/activeCompSlice'

export const store = configureStore({
  reducer: {
    user : userReducer,
    company : companyReducer
  }
})