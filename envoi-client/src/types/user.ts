import { userConstants } from "../state/user/userConstants";

export interface IUserReduxState {
  token?: string;
};

export interface ISetTokenAction {
  type: userConstants.setToken,
  payload: string,
};

export interface IRemoveTokenAction {
  type: userConstants.removeToken,
};

export type UserAction = ISetTokenAction | IRemoveTokenAction;