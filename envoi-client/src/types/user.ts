import { userConstants } from "../state/user/userConstants";
import {
  ILoadableReduxState,
  IClearErrorAction,
  IApiError,
  IApiErrorResponse,
} from "./api";

export type UserType = "CONSUMER" | "CREATOR";

export interface IUserReduxState extends ILoadableReduxState {
  _id?: string;
  credits?: number;
  registered?: boolean;
  token?: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  type?: UserType;
  error?: IApiError;
}

export interface IUserData {
  loggedIn: boolean;
  credits?: number;
  user: {
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    type?: UserType;
  };
}

export interface IRemoveTokenAction {
  type: userConstants.removeToken;
}

export interface IRequestGetCreditsAction {
  type: userConstants.reqGetCredits;
}

export interface IReceiveGetCreditsAction {
  type: userConstants.resGetCredits;
  payload:
    | {
        credits: number;
      }
    | IApiErrorResponse;
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
        _id: string;
        token: string;
        username: string;
        email: string;
        firstName: string;
        lastName?: string;
        type: UserType;
      }
    | IApiErrorResponse;
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
  payload:
    | {
        registered: boolean;
      }
    | IApiErrorResponse;
}

export type UserAction =
  | IRequestGetCreditsAction
  | IReceiveGetCreditsAction
  | IRemoveTokenAction
  | IRequestLoginAction
  | IReceiveLoginAction
  | IRequestRegisterAction
  | IReceiveRegisterAction
  | IClearErrorAction<userConstants.clearError>;
