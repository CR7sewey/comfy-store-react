import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  // just responsible for the cart
  cartItems: [], // cartItems, //[],
  isLoading: true,
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  ordercartTotal: 0,
};

/*
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, thunkAPI) => {
    // first param is the passed when invoking
    try {
      const resp = await axios("url");
      // thunkAPI has everything in the store (console.log(thinkAPI.getState()))
      // so, example, thunkAPI.dispatch(openModal()) // accessing other reducer
      console.log(resp, "axios");
      return resp.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("There was an error...");
    }
  }
);*/

const getInitialState = () => {
  return JSON.parse(localStorage.getItem("cartItems")) || initialState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialState(),
  reducers: {
    clearCart: (state) => {
      // semelhante ao dispatch do use reducer??
      state.cartItems = []; // dont have to return anything ao contrario do useReducer (bcs the Immer Library! check read me)
      localStorage.setItem("cartItems", JSON.stringify(state));
    },
    clearItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (values) => values.id !== action.payload
      );
    },
    increaseItem: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      cartItem.numItemsInCart += 1;
    },
    decreaseItem: (state, action) => {
      let zero = false;
      state.cartItems.map((values) => {
        if (values.id === action.payload) {
          values.numItemsInCart -= 1;
        }
        if (values.numItemsInCart === 0) {
          zero = true;
        }
      });
      if (zero) {
        state.cartItems = state.cartItems.filter(
          (values) => values.id !== action.payload
        );
      }
    },
    calculatecartTotals: (state) => {
      let total = 0;
      let numItemsInCart = 0;
      state.cartItems.forEach((val) => {
        total += Number(val.price) * val.numItemsInCart;
        numItemsInCart += val.numItemsInCart;
      });

      state.numItemsInCart = numItemsInCart;
      state.cartTotal = total;
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

console.log(cartSlice);
console.log(cartSlice.actions);

export const {
  clearCart,
  clearItem,
  decreaseItem,
  increaseItem,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
