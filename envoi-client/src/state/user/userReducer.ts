import { userConstants } from "./userConstants";
import {
  UserAction,
  IUserReduxState,
  IReceiveLoginAction,
  IReceiveRegisterAction,
} from "../../types/user";

const initialState: IUserReduxState = {};

export const userReducer = (
  state: IUserReduxState = initialState,
  action: Partial<UserAction>,
): IUserReduxState => {
  switch (action.type) {
    case userConstants.clearError:
      const { error, loading, registered, ...rest } = state;
      return rest;
    case userConstants.removeToken:
      return {};
    case userConstants.resLogin:
      return {
        ...(action as IReceiveLoginAction).payload,
      };
    case userConstants.resRegister:
      return {
        ...(action as IReceiveRegisterAction).payload,
      };
    case userConstants.resGetCredits:
      return {
        ...state,
        ...action.payload,
      };
    case userConstants.reqLogin:
    case userConstants.reqGetCredits:
    case userConstants.reqRegister:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
