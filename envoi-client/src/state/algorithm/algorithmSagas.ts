import {
  receiveGetAlgorithmAction,
  receiveListAlgorithmAction,
  receiveEditAlgorithmAction,
  receiveCreateAlgorithmAction,
  receiveDeleteAlgorithmAction,
} from "./algorithmActions";
import {
  IRequestGetAlgorithmAction,
  IRequestEditAlgorithmAction,
  IRequestListAlgorithmAction,
  IRequestDeleteAlgorithmAction,
  IRequestCreateAlgorithmAction,
} from "../../types/algorithm";
import { put } from "redux-saga/effects";
import { select } from "redux-saga/effects";
import { apiFetch } from "../../helpers/api";

export function* requestGetAlgorithm(action: IRequestGetAlgorithmAction) {
  const {
    user: { token },
  } = yield select();
  const response = yield apiFetch(`algorithms/${action.payload}`, token, "GET");
  yield put(receiveGetAlgorithmAction(response.data));
}

export function* requestListAlgorithm(action: IRequestListAlgorithmAction) {
  const {
    user: { token },
  } = yield select();
  const response = yield apiFetch(`algorithms`, token, "GET");
  yield put(receiveListAlgorithmAction(response.data));
}

export function* requestCreateAlgorithm(action: IRequestCreateAlgorithmAction) {
  const {
    user: { token },
  } = yield select();
  const response = yield apiFetch(`algorithms`, token, "POST", action.payload);
  yield put(receiveCreateAlgorithmAction(response.data));
}

export function* requestEditAlgorithm(action: IRequestEditAlgorithmAction) {
  const {
    user: { token },
  } = yield select();
  const response = yield apiFetch(
    `algorithms/${action.payload._id}`,
    token,
    "PATCH",
    action.payload,
  );
  yield put(receiveEditAlgorithmAction(response.data));
}

export function* requestDeleteAlgorithm(action: IRequestDeleteAlgorithmAction) {
  const {
    user: { token },
  } = yield select();
  const response = yield apiFetch(
    `algorithms/${action.payload}`,
    token,
    "DELETE",
  );
  yield put(receiveDeleteAlgorithmAction(response.data));
}
