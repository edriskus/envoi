import { userConstants } from "./userConstants";

export function setTokenAction(token: string) {
  return {
    type: userConstants.setToken,
    payload: token,
  };
}

export function removeTokenAction() {
  return {
    type: userConstants.removeToken,
  };
}