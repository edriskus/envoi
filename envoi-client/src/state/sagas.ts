import {
  requestGetJob,
  requestEditJob,
  requestListJob,
  requestCreateJob,
  requestDeleteJob,
} from "./job/jobSagas";
import {
  requestGetAlgorithm,
  requestEditAlgorithm,
  requestListAlgorithm,
  requestCreateAlgorithm,
  requestDeleteAlgorithm,
} from "./algorithm/algorithmSagas";
import { requestLogin } from "./user/userSagas";
import { IAppReduxState } from "../types/global";
import { jobConstants } from "./job/jobConstants";
import { userConstants } from "./user/userConstants";
import { persistState } from "../helpers/localStorage";
import { select, takeLatest, delay } from "redux-saga/effects";
import { algorithmConstants } from "./algorithm/algorithmConstants";

/**
 * Persists state in localStorage
 */
function* statePersistor() {
  const appState: IAppReduxState = yield select();
  const { user } = appState;
  yield delay(1000);
  persistState({
    user,
  });
}

/**
 * Add all sagas here
 */
function* rootSaga() {
  yield takeLatest("*", statePersistor);

  // User sagas
  yield takeLatest(userConstants.reqLogin, requestLogin);

  // Algorithm sagas
  yield takeLatest(algorithmConstants.reqGetAlgorithm, requestGetAlgorithm);
  yield takeLatest(
    algorithmConstants.reqCreateAlgorithm,
    requestCreateAlgorithm,
  );
  yield takeLatest(algorithmConstants.reqEditAlgorithm, requestEditAlgorithm);
  yield takeLatest(algorithmConstants.reqListAlgorithm, requestListAlgorithm);
  yield takeLatest(
    algorithmConstants.reqDeleteAlgorithm,
    requestDeleteAlgorithm,
  );

  // Job sagas
  yield takeLatest(jobConstants.reqGetJob, requestGetJob);
  yield takeLatest(jobConstants.reqCreateJob, requestCreateJob);
  yield takeLatest(jobConstants.reqEditJob, requestEditJob);
  yield takeLatest(jobConstants.reqListJob, requestListJob);
  yield takeLatest(jobConstants.reqDeleteJob, requestDeleteJob);
}

export { rootSaga };
