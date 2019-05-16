import { userConstants } from "./userConstants";
import {
  IRemoveTokenAction,
  IRequestLoginAction,
  IRequestRegisterAction,
  IReceiveRegisterAction,
  IReceiveLoginAction,
  IRequestGetCreditsAction,
  IReceiveGetCreditsAction,
  UserType,
} from "../../types/user";
import { IClearErrorAction, IApiError, IApiErrorResponse } from "../../types/api";

export const clearErrorAction = 
  (): IClearErrorAction<userConstants.clearError> => ({
    type: userConstants.clearError,
  });

export const requestGetCreditsAction = (): IRequestGetCreditsAction => ({
  type: userConstants.reqGetCredits,
});

export const receiveGetCreditsAction = (payload: { 
    credits: number,
  } | IApiErrorResponse): IReceiveGetCreditsAction => ({
  type: userConstants.resGetCredits,
  payload,
});

export const removeTokenAction = (): IRemoveTokenAction => ({
  type: userConstants.removeToken,
});

export const requestLoginAction = (
  username: string,
  password: string,
): IRequestLoginAction => ({
  type: userConstants.reqLogin,
  payload: { username, password },
});

export const receiveLoginAction = (
  response: {
    _id: string,
    token: string,
    username: string,
    email: string,
    firstName: string,
    lastName?: string,
    type: UserType,
  } | {
    error: IApiError,
  },
): IReceiveLoginAction => ({
  type: userConstants.resLogin,
  payload: response,
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
  },
});

export const receiveRegisterAction = (payload: {
    registered: boolean,
  } | IApiErrorResponse): IReceiveRegisterAction => ({
  type: userConstants.resRegister,
  payload,
});