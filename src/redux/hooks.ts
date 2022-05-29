import {
  useSelector as useReduxSelect,
  TypedUseSelectorHook,
  useDispatch,
} from "react-redux";
import { RooteState, AppDispatch } from "./store";

export const useSelector: TypedUseSelectorHook<RooteState> = useReduxSelect;
export const useAppDispatch = () => useDispatch<AppDispatch>();
