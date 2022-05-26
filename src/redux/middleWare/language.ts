import { Middleware } from "redux";
import { CHANGE_LANGUAGE } from "../language/languageActions";
import { changeLanguage } from "i18next";
export const languageM: Middleware = (store) => (next) => (action) => {
  if (action.type === CHANGE_LANGUAGE) {
    changeLanguage(action.payload);
  }
  next(action);
};
