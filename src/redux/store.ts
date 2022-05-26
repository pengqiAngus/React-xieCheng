import { createStore, combineReducers, applyMiddleware } from "redux";
import languageReducer from "./language/languageReducer";
import recommandProductsReducer from "./recommandProducts/recommandProductsReducer";
import thunk from "redux-thunk";
import { actionLog } from "./middleWare/anctionLog";
import { languageM } from "./middleWare/language";
const rootReducer = combineReducers({
  language: languageReducer,
  recommandProduct: recommandProductsReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, actionLog, languageM)
);
export type RooteState = ReturnType<typeof store.getState>;
export default store;
