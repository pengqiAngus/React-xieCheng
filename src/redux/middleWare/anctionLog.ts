import { Middleware } from "redux";

export const actionLog: Middleware = (store) => (next) => (action) => {
  console.log("state当前状态", store.getState());
  console.log("action", action);
  next(action);
  console.log("state更新状态", store.getState());
};
