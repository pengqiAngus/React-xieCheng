export const CHANGE_LANGUAGE = "change_language";

interface changeLanguageAction {
  type: typeof CHANGE_LANGUAGE;
  payload: "zh" | "en";
}
export type languageTypes = changeLanguageAction;
export const changeLanguageActionCreator = (
  languageCode: "zh" | "en"
): changeLanguageAction => {
  return {
    type: CHANGE_LANGUAGE,
    payload: languageCode,
  };
};
