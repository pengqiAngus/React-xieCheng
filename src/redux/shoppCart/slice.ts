import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface ShoppingCartState {
  loading: boolean;
  error: string | null;
  items: any[];
}

const initialState: ShoppingCartState = {
  loading: true,
  error: null,
  items: [null],
};
export const getShoppingCart = createAsyncThunk(
  "shoppingCart/getShoppingCart",
  async (token: string, thunkAPI) => {
    let url = `http://123.56.149.216:8080/api/shoppingCart`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    return data.shoppingCartItems;
  }
);
export const addShoppingCartItem = createAsyncThunk(
  "shoppingCart/addShoppingCartItem",
  async (
    parameters: {
      token: string;
      touristRouteId: string;
    },
    thunkAPI
  ) => {
    let url = `http://123.56.149.216:8080/api/shoppingCart/items`;

    const { data } = await axios.post(
      url,
      {
        touristRouteId: parameters.touristRouteId,
      },
      {
        headers: {
          Authorization: `bearer ${parameters.token}`,
        },
      }
    );
    console.log("data.shoppingCartItems", data.shoppingCartItems);

    return data.shoppingCartItems;
  }
);
export const clearShoppingCartItem = createAsyncThunk(
  "shoppingCart/addShoppingCartItem",
  async (
    parameters: {
      token: string;
      itemIds: number[];
    },
    thunkAPI
  ) => {
    let url = `http://123.56.149.216:8080/api/shoppingCart/items/(${parameters.itemIds.join(
      ","
    )})`;

    return await axios.delete(url, {
      headers: {
        Authorization: `bearer ${parameters.token}`,
      },
    });
  }
);
export const checkOut = createAsyncThunk(
  "shoppingCart/checkOut",
  async (token: string, thunkAPI) => {
    let url = `http://123.56.149.216:8080/api/shoppingCart/checkout`;

    const { data } = await axios.post(url, null, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    return data;
  }
);

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: {
    // ?????????????????????
    [getShoppingCart.pending.type]: (state) => {
      // return {...state, loading:true} ???????????????
      state.loading = true; //immer?????????
    },
    [getShoppingCart.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    [getShoppingCart.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    // ????????????
    [addShoppingCartItem.pending.type]: (state) => {
      // return {...state, loading:true} ???????????????
      state.loading = true; //immer?????????
    },
    [addShoppingCartItem.fulfilled.type]: (state, action) => {
      console.log(action.payload);

      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    [addShoppingCartItem.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    // ????????????
    [clearShoppingCartItem.pending.type]: (state) => {
      // return {...state, loading:true} ???????????????
      state.loading = true; //immer?????????
    },
    [clearShoppingCartItem.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.items = [];
      state.error = null;
    },
    [clearShoppingCartItem.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    // ??????
    [checkOut.pending.type]: (state) => {
      // return {...state, loading:true} ???????????????
      state.loading = true; //immer?????????
    },
    [checkOut.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.items = [];
      state.error = null;
    },
    [checkOut.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
