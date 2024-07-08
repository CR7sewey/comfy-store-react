import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  user: { username: "comfy store user" },
  theme: "dracula",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log("aqui zezocas 1");
    },
    logoutUser: (state) => {
      console.log("aqui zezocas 2");
    },
    toggleTheme: (state, action) => {
      console.log("aqui zezocas 3");
    },
  },
  /*
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) =>
        // 3 lifecicles (pending, fulfill and rejected)
        {
          state.isLoading = true;
        }
      )
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload; // data from api - check on redux browser
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false;
      });
  },*/
});

console.log(userSlice);
console.log(userSlice.actions);

export const { loginUser } = userSlice.actions;

export default userSlice.reducer;
