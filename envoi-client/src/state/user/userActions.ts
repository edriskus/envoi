import { userConstants } from "./userConstants";
import {
  IRemoveTokenAction,
  IRequestLoginAction,
  IRequestRegisterAction,
  IReceiveRegisterAction,
  IReceiveLoginAction,
} from "../../types/user";
import { IClearErrorAction, IApiError } from "../../types/api";

export const clearErrorAction = 
  (): IClearErrorAction<userConstants.clearError> => ({
    type: userConstants.clearError
  });

export const removeTokenAction = (): IRemoveTokenAction => ({
  type: userConstants.removeToken
});

export const requestLoginAction = (
  username: string,
  password: string
): IRequestLoginAction => ({
  type: userConstants.reqLogin,
  payload: { username, password }
});

export const receiveLoginAction = (
  response: {
    token: string,
    username: string,
    email: string,
    firstName: string,
    lastName?: string,
  } | {
    error: IApiError
  }
): IReceiveLoginAction => ({
  type: userConstants.resLogin,
  payload: response
});

export const requestRegisterAction = (
  username: string,
  password: string,
  email: string,
  acceptTerms: boolean,
  firstName: string,
  lastName?: string,
): IRequestRegisterAction => ({
  type: userConstants.reqRegister,
  payload: {
    username,
    password,
    email,
    acceptTerms,
    firstName,
    lastName,
  }
});

export const receiveRegisterAction = (): IReceiveRegisterAction => ({
  type: userConstants.resRegister,
  payload: {}
});