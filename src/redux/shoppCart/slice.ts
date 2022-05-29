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
    // 获取购物车列表
    [getShoppingCart.pending.type]: (state) => {
      // return {...state, loading:true} 以前的写法
      state.loading = true; //immer的写法
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
    // 添加商品
    [addShoppingCartItem.pending.type]: (state) => {
      // return {...state, loading:true} 以前的写法
      state.loading = true; //immer的写法
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
    // 删除商品
    [clearShoppingCartItem.pending.type]: (state) => {
      // return {...state, loading:true} 以前的写法
      state.loading = true; //immer的写法
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
    // 下单
    [checkOut.pending.type]: (state) => {
      // return {...state, loading:true} 以前的写法
      state.loading = true; //immer的写法
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
