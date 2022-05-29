import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { checkOut } from "../shoppCart/slice";
import axios from "axios";
interface OrderState {
  loading: boolean;
  error: string | null;
  currentOrder: any;
}

const initialState: OrderState = {
  loading: false,
  error: null,
  currentOrder: null,
};
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (parma: { token: string; orderId: string }, thunkAPI) => {
    const { data } = await axios.post(
      `http://123.56.149.216:8080/api/order/${parma.orderId}/placeOrder`,
      null,
      {
        headers: {
          Authorization: `bearer ${parma.token}`,
        },
      }
    );
    return data;
  }
);
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // fetchStart: (state) => {
    //   // return {...state, loading:true} 以前的写法
    //   state.loading = true; //immer的写法
    // },
    // fetchSuccess: (state, action) => {
    //   state.loading = false;
    //   state.data = action.payload;
    //   state.error = null;
    // },
    // fetchError: (state, action: PayloadAction<string | null>) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
  },
  extraReducers: {
    [placeOrder.pending.type]: (state) => {
      // return {...state, loading:true} 以前的写法
      state.loading = true; //immer的写法
    },
    [placeOrder.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.currentOrder = action.payload;
      state.error = null;
    },
    [placeOrder.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    // ----------------------------
    [checkOut.pending.type]: (state) => {
      // return {...state, loading:true} 以前的写法
      state.loading = true; //immer的写法
    },
    [checkOut.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.currentOrder = action.payload;
      state.error = null;
    },
    [checkOut.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
