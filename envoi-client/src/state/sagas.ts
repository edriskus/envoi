import { requestLogin } from "./user/userSagas";
import { IAppReduxState } from "../types/global";
import { userConstants } from "./user/userConstants";
import { persistState } from "../helpers/localStorage";
import { select, takeLatest, delay } from "redux-saga/effects";

/**
 * Persists state in localStorage
 */
function* statePersistor() {
  const appState: IAppReduxState = yield select();
  const { user } = appState;
  yield delay(1000);
  persistState({
    user
  });
}

/**
 * Add all sagas here
 */
function* rootSaga() {
  yield takeLatest("*", statePersistor);

  // User sagas
  yield takeLatest(userConstants.reqLogin, requestLogin);
}

export { rootSaga };
