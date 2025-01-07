import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // Import the reducer function from cartSlice

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Use the reducer function, not the entire cartSlice object
  },
});
