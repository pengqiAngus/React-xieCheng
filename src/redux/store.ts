// import { createStore, applyMiddleware } from "redux";
import {
  combineReducers,
  configureStore,
  // getDefaultMiddleware,
} from "@reduxjs/toolkit";
import languageReducer from "./language/languageReducer";
import recommandProductsReducer from "./recommandProducts/recommandProductsReducer";
// import thunk from "redux-thunk";
import { actionLog } from "./middleWare/anctionLog";
import { languageM } from "./middleWare/language";
import { productDetailSlice } from "./productDetail/slice";
import { productSearchSlice } from "./productSearch/slice";
import { shoppingCartSlice } from "./shoppCart/slice";
import { orderSlice } from "./order/slice";
import { userSlice } from "./user/slice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};
const rootReducer = combineReducers({
  language: languageReducer,
  recommandProduct: recommandProductsReducer,
  productDetail: productDetailSlice.reducer,
  productSearch: productSearchSlice.reducer,
  user: userSlice.reducer,
  shoppingCart: shoppingCartSlice.reducer,
  order: orderSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk, actionLog, languageM)
// );//普通store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(actionLog).concat(languageM),
  devTools: true,
}); //RTK-store
const persistor = persistStore(store);
export type RooteState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default { store, persistor };
