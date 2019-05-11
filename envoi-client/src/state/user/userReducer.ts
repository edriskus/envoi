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
      const { error, ...rest } = state;
      return rest;
    case userConstants.removeToken:
      return {};
    case userConstants.reqLogin:
      return {
        ...state,
        loading: true,
      };
    case userConstants.resLogin:
      return {
        ...(action as IReceiveLoginAction).payload,
      };
    case userConstants.reqRegister:
      return {
        ...state,
        loading: true,
      };
    case userConstants.resRegister:
      return {
        ...(action as IReceiveRegisterAction).payload,
      };
    default:
      return state;
  }
};
