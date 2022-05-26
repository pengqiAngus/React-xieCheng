import {
  useSelector as useReduxSelect,
  TypedUseSelectorHook,
} from "react-redux";
import { RooteState } from "./store";

export const useSelector: TypedUseSelectorHook<RooteState> = useReduxSelect;
