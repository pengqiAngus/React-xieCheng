import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface userState {
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: userState = {
  loading: false,
  error: null,
  token: null,
};
export const logIn = createAsyncThunk(
  "user/logIn",
  async (parameters: { email: string; password: string }, thunkAPI) => {
    const { data } = await axios.post(`http://123.56.149.216:8080/auth/login`, {
      email: parameters.email,
      password: parameters.password,
    });
    return data.token;
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.error = null;
      state.token = null;
      state.loading = false;
    },
  },
  extraReducers: {
    [logIn.pending.type]: (state) => {
      // return {...state, loading:true} 以前的写法
      state.loading = true; //immer的写法
    },
    [logIn.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.token = action.payload;
      state.error = null;
    },
    [logIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
