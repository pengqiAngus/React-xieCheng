import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface ProductDetailState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null,
};
export const getproductDetail = createAsyncThunk(
  "productDetail/getproductDetail",
  async (id: string, thunkAPI) => {
    const { data } = await axios.get(
      `http://123.56.149.216:8080/api/touristRoutes/${id}`
    );
    return data;
  }
);
export const productDetailSlice = createSlice({
  name: "productDetail",
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
    [getproductDetail.pending.type]: (state) => {
      // return {...state, loading:true} 以前的写法
      state.loading = true; //immer的写法
    },
    [getproductDetail.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    [getproductDetail.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
