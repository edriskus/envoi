import { put } from "redux-saga/effects";
import { apiFetch } from "../../helpers/api";
import { receiveLoginAction } from "./userActions";
import { IRequestLoginAction } from "../../types/user";

export function* requestLogin(action: IRequestLoginAction) {
  const response = yield apiFetch(
    'auth/login',
    null,
    'POST',
    action.payload
  ).catch(e => ({ data: { error: e.response.data }}));  
  yield put(receiveLoginAction(response.data));
}