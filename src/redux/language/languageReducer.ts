import { CHANGE_LANGUAGE, languageTypes } from "./languageActions";
export interface languageState {
  language: "en" | "zh";
  languageList: { name: string; code: string }[];
}

const defaultState: languageState = {
  language: "zh",
  languageList: [
    { name: "中文", code: "zh" },
    { name: "English", code: "en" },
  ],
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action: languageTypes) => {
  if (action.type === CHANGE_LANGUAGE) {
    const newState = { ...state, language: action.payload };
    return newState;
  }
  return state;
};
