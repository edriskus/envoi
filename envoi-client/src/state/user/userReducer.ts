import { userConstants } from "./userConstants";
import { IUserReduxState, UserAction, ISetTokenAction } from "../../types/user";

const initialState: IUserReduxState = {};

export const userReducer = (
  state: IUserReduxState = initialState,
  action: Partial<UserAction>
): IUserReduxState => {
  switch (action.type) {
    case userConstants.setToken:
      return {
        ...state,
        token: (action as ISetTokenAction).payload
      };
    case userConstants.removeToken:
      const { token, ...rest } = state;
      return rest;
    default:
      return state;
  }
};
