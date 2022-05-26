import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
export const FETCH_RECOMMEND_PRODUCTS_START = "FETCH_RECOMMEND_PRODUCTS_START";
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS =
  "FETCH_RECOMMEND_PRODUCTS_SUCCESS";
export const FETCH_RECOMMEND_PRODUCTS_FAIL = "FETCH_RECOMMEND_PRODUCTS_FAIL";

interface FetchRecommendProductStartAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_START;
}
interface FetchRecommendProductSuccessAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS;
  payload: any;
}
interface FetchRecommendProductFailAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL;
  payload: any;
}

export type RecommendProductsAction =
  | FetchRecommendProductStartAction
  | FetchRecommendProductSuccessAction
  | FetchRecommendProductFailAction;

export const getRecommendProductData =
  (): ThunkAction<void, RooteState, undefined, RecommendProductsAction> =>
  async (dispatch, getState) => {
    dispatch(fetchRecommendProductStartActionCreator);
    try {
      const res = await axios.get(
        "http://123.56.149.216:8080/api/productCollections"
      );
      dispatch(fetchRecommendProductSuccessActionCreator(res.data));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(fetchRecommendProductFailActionCreator(error.message));
      }
    }
  };

export const fetchRecommendProductStartActionCreator =
  (): FetchRecommendProductStartAction => {
    return {
      type: FETCH_RECOMMEND_PRODUCTS_START,
    };
  };

export const fetchRecommendProductSuccessActionCreator = (
  data
): FetchRecommendProductSuccessAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: data,
  };
};

export const fetchRecommendProductFailActionCreator = (
  e
): FetchRecommendProductFailAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: e,
  };
};
