import { Reducer, combineReducers } from "redux";
import { IAppReduxState } from "../types/global";
import { userReducer } from "./user/userReducer";
import { algorithmReducer } from "./algorithm/algorithmReducer";

export const getAppReducers = (): Reducer<IAppReduxState> => {
  return combineReducers<IAppReduxState, any>({
    user: userReducer,
    algorithm: algorithmReducer,
  });
};
