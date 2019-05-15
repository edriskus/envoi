import {
  IApiErrorResponse,
  IApiDeleteReponse,
  IClearErrorAction,
} from "../../types/api";
import {
  IJob,
  IJobSummary,
  IJobRequest,
  IReceiveGetJobAction,
  IRequestGetJobAction,
  IRequestEditJobAction,
  IRequestListJobAction,
  IReceiveListJobAction,
  IReceiveEditJobAction,
  IReceiveCreateJobAction,
  IRequestDeleteJobAction,
  IRequestCreateJobAction,
  IReceiveDeleteJobAction,
} from "../../types/job";
import { jobConstants } from "./jobConstants";

export const clearErrorAction = (): IClearErrorAction<
  jobConstants.clearError
> => ({
  type: jobConstants.clearError,
});

export const clearJobAction = (): IClearErrorAction<
  jobConstants.clearJob
> => ({
  type: jobConstants.clearJob,
});

export const requestCreateJobAction = (
  payload: Partial<IJobRequest>,
): IRequestCreateJobAction => ({
  type: jobConstants.reqCreateJob,
  payload,
});

export const receiveCreateJobAction = (
  payload: IJob | IApiErrorResponse,
): IReceiveCreateJobAction => ({
  type: jobConstants.resCreateJob,
  payload,
});

export const requestEditJobAction = (
  payload: Partial<IJobRequest>,
): IRequestEditJobAction => ({
  type: jobConstants.reqEditJob,
  payload,
});

export const receiveEditJobAction = (
  payload: IJob | IApiErrorResponse,
): IReceiveEditJobAction => ({
  type: jobConstants.resEditJob,
  payload,
});

export const requestListJobAction = (): IRequestListJobAction => ({
  type: jobConstants.reqListJob,
});
export const receiveListJobAction = (
  payload: IJobSummary[] | IApiErrorResponse,
): IReceiveListJobAction => ({
  type: jobConstants.resListJob,
  payload,
});

export const requestGetJobAction = (
  jobId: string,
): IRequestGetJobAction => ({
  type: jobConstants.reqGetJob,
  payload: jobId,
});

export const receiveGetJobAction = (
  payload: IJob | IApiErrorResponse,
): IReceiveGetJobAction => ({
  type: jobConstants.resGetJob,
  payload,
});

export const requestDeleteJobAction = (
  jobId: string,
): IRequestDeleteJobAction => ({
  type: jobConstants.reqDeleteJob,
  payload: jobId,
});

export const receiveDeleteJobAction = (
  payload: IApiDeleteReponse | IApiErrorResponse,
): IReceiveDeleteJobAction => ({
  type: jobConstants.resDeleteJob,
  payload,
});
