import { apiFetch } from "../../helpers/api";
import { put, select, all } from "redux-saga/effects";
import {
  receiveLoginAction,
  receiveRegisterAction,
  receiveGetCreditsAction,
  requestGetCreditsAction,
} from "./userActions";
import {
  IRequestLoginAction,
  IRequestRegisterAction,
  IRequestGetCreditsAction,
} from "../../types/user";

export function* requestLogin(action: IRequestLoginAction) {
  const response = yield apiFetch("auth/login", null, "POST", action.payload);
  yield all([
    put(receiveLoginAction(response.data)),
    put(requestGetCreditsAction()),
  ]);
}

export function* requestRegister(action: IRequestRegisterAction) {
  const {
    data: { error },
  } = yield apiFetch("auth/register", null, "POST", action.payload);
  yield put(receiveRegisterAction(error ? { error } : { registered: true }));
}

export function* requestGetCredits(action: IRequestGetCreditsAction) {
  const {
    user: { token },
  } = yield select();
  const {
    data: { error, value },
  } = yield apiFetch("settings/credits", token);
  yield put(
    receiveGetCreditsAction(value != null ? { credits: value } : { error }),
  );
}
