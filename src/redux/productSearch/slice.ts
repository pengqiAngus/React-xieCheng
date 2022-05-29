import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface ProductSearchState {
  loading: boolean;
  error: string | null;
  data: any;
  pagination: any;
}

const initialState: ProductSearchState = {
  loading: true,
  error: null,
  data: null,
  pagination: null,
};
export const searchProduct = createAsyncThunk(
  "productDetail/getproductDetail",
  async (
    parameters: {
      keywords?: string;
      nextPage: number | string;
      pageSize: number | string;
    },
    thunkAPI
  ) => {
    let url = `http://123.56.149.216:8080/api/touristRoutes?pageNumber=${parameters.nextPage}&pageSize=${parameters.pageSize}`;
    if (parameters.keywords) {
      url += `&keyword=${parameters.keywords}`;
    }
    const res = await axios.get(url);
    return {
      data: res.data,
      pagination: JSON.parse(res.headers["x-pagination"]),
    };
  }
);
export const productSearchSlice = createSlice({
  name: "productSearch",
  initialState,
  reducers: {},
  extraReducers: {
    [searchProduct.pending.type]: (state) => {
      // return {...state, loading:true} 以前的写法
      state.loading = true; //immer的写法
    },
    [searchProduct.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.error = null;
      state.pagination = action.payload.pagination;
    },
    [searchProduct.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
