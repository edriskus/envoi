import {
  receiveGetJobAction,
  receiveListJobAction,
  receiveEditJobAction,
  receiveCreateJobAction,
  receiveDeleteJobAction,
} from "./jobActions";
import {
  IRequestGetJobAction,
  IRequestEditJobAction,
  IRequestListJobAction,
  IRequestDeleteJobAction,
  IRequestCreateJobAction,
} from "../../types/job";
import { put } from "redux-saga/effects";
import { select } from "redux-saga/effects";
import { apiFetch } from "../../helpers/api";

export function* requestGetJob(action: IRequestGetJobAction) {
  const {
    user: { token },
  } = yield select();
  const response = yield apiFetch(`jobs/${action.payload}`, token, "GET");
  yield put(receiveGetJobAction(response.data));
}

export function* requestListJob(action: IRequestListJobAction) {
  const {
    user: { token },
  } = yield select();
  const response = yield apiFetch(`jobs`, token, "GET");
  yield put(receiveListJobAction(response.data));
}

export function* requestCreateJob(action: IRequestCreateJobAction) {
  const {
    user: { token },
  } = yield select();
  const response = yield apiFetch(`jobs`, token, "POST", action.payload);
  yield put(receiveCreateJobAction(response.data));
}

export function* requestEditJob(action: IRequestEditJobAction) {
  const {
    user: { token },
  } = yield select();
  const response = yield apiFetch(
    `jobs/${action.payload._id}`,
    token,
    "PATCH",
    action.payload,
  );
  yield put(receiveEditJobAction(response.data));
}

export function* requestDeleteJob(action: IRequestDeleteJobAction) {
  const {
    user: { token },
  } = yield select();
  const response = yield apiFetch(
    `jobs/${action.payload}`,
    token,
    "DELETE",
  );
  yield put(receiveDeleteJobAction(response.data));
}
