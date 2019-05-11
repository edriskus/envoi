import { userConstants } from "../state/user/userConstants";
import { ILoadableReduxState, IClearErrorAction, IApiError } from "./api";

export interface IUserReduxState extends ILoadableReduxState {
  token?: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface IUserData {
  loggedIn: boolean;
  user: {
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  };
}

export interface IRemoveTokenAction {
  type: userConstants.removeToken;
}

export interface IRequestLoginAction {
  type: userConstants.reqLogin;
  payload: {
    username: string;
    password: string;
  };
}

export interface IReceiveLoginAction {
  type: userConstants.resLogin;
  payload:
    | {
        token: string;
        username: string;
        email: string;
        firstName: string;
        lastName?: string;
      }
    | {
        error: IApiError;
      };
}

export interface IRequestRegisterAction {
  type: userConstants.reqRegister;
  payload: {
    username: string;
    password: string;
    email: string;
    acceptTerms: boolean;
    firstName: string;
    lastName?: string;
  };
}

export interface IReceiveRegisterAction {
  type: userConstants.resRegister;
  payload: {};
}

export type UserAction =
  | IRemoveTokenAction
  | IRequestLoginAction
  | IReceiveLoginAction
  | IRequestRegisterAction
  | IReceiveRegisterAction
  | IClearErrorAction<userConstants.clearError>;
