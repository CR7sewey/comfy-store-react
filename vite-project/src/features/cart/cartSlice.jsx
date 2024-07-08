import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

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

const getCartTotal = (state) => {
  let total = 0;
  state.cartItems.forEach((items) => {
    total += Number(items.amount) * Number(items.price);
  });
  let tax = total * 0.1;
  let ordercartTotal = total + state.shipping + tax;
  console.log(ordercartTotal, "oct");
  return { total, ordercartTotal, tax };
};

const getInitialState = () => {
  return JSON.parse(localStorage.getItem("cartItems")) || initialState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialState(),
  reducers: {
    addItem: (state, action) => {
      console.log(action);
      const cartItem = state.cartItems.find(
        (item) => item.cartID === action.payload.cartID
      );
      if (cartItem) {
        cartItem.amount += action.payload.amount;
        console.log(cartItem.amount);
      } else {
        state.cartItems.push(action.payload);
      }

      state.numItemsInCart += action.payload.amount;
      /* const { total, ordercartTotal, tax } = getCartTotal(state);
      state.ordercartTotal = ordercartTotal;
      state.cartTotal = total;
      state.tax = tax;*/
      cartSlice.caseReducers.calculatecartTotals(state);

      localStorage.setItem("cartItems", JSON.stringify(state));
      toast.success(`Item ${action.payload.cartID} added to the cart!`);
    },
    removeItem: (state, action) => {
      console.log(action);
      state.cartItems = state.cartItems.filter(
        (values) => values.cartID !== action.payload.cartID
      );
      state.numItemsInCart -= action.payload.amount;
      /* const { total, ordercartTotal, tax } = getCartTotal(state);
      state.ordercartTotal = ordercartTotal;
      state.cartTotal = total;
      state.tax = tax;*/
      cartSlice.caseReducers.calculatecartTotals(state);
      localStorage.setItem("cartItems", JSON.stringify(state));
      toast.error("Item removed from cart");
    },
    editItem: (state, action) => {
      let previousAmount = 0;
      state.cartItems = state.cartItems.map((values) => {
        if (values.cartID === action.payload.cartID) {
          previousAmount = values.amount;
          values.amount = action.payload.amount;
        }
        return values;
      });
      state.numItemsInCart =
        state.numItemsInCart + action.payload.amount - previousAmount;
      /* const { total, ordercartTotal, tax } = getCartTotal(state);
      state.ordercartTotal = ordercartTotal;
      state.cartTotal = total;
      state.tax = tax;*/
      cartSlice.caseReducers.calculatecartTotals(state);
      localStorage.setItem("cartItems", JSON.stringify(state));
      toast.error("Item removed from cart");
    },

    clearCart: (state) => {
      // semelhante ao dispatch do use reducer??
      state.cartItems = []; // dont have to return anything ao contrario do useReducer (bcs the Immer Library! check read me)
      /* const { total, ordercartTotal, tax } = getCartTotal(state);
      state.ordercartTotal = ordercartTotal;
      state.cartTotal = total;
      state.tax = tax;*/
      cartSlice.caseReducers.calculatecartTotals(state);
      localStorage.setItem("cartItems", JSON.stringify(state));
    },

    /*increaseItem: (state, action) => {
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
    },*/
    calculatecartTotals: (state) => {
      let total = 0;
      state.cartItems.forEach((items) => {
        total += Number(items.amount) * Number(items.price);
      });
      let tax = total * 0.1;
      state.tax = tax;
      state.cartTotal = total;
      state.ordercartTotal = state.cartTotal + state.shipping + state.tax;
      //let ordercartTotal = total + state.shipping + tax;
      //console.log(ordercartTotal, "oct");
      //return { total, ordercartTotal, tax };
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
  addItem,
  removeItem,
  editItem,
} = cartSlice.actions;

export default cartSlice.reducer;
