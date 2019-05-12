import { jobConstants } from "../state/job/jobConstants";
import {
  IClearErrorAction,
  ILoadableReduxState,
  IApiErrorResponse,
  IApiDeleteReponse,
} from "./api";
import { IFilePointer, IFilePointerSummary } from "./algorithm";

export type IJobRequest = IJob;

export interface IJobSummary {
  _id: string;
  title: string;
  description: string;
  inputs: IFilePointerSummary;
}

export interface IJob {
  _id?: string;
  title: string;
  description: string;
  algorithmId: string;
  inputs: IFilePointer;
}

export interface IJobReduxState extends ILoadableReduxState {
  list?: IJobSummary[];
  single?: IJob;
}

export interface IRequestCreateJobAction {
  type: jobConstants.reqCreateJob;
  payload: Partial<IJobRequest>;
}

export interface IReceiveCreateJobAction {
  type: jobConstants.resCreateJob;
  payload: IJob | IApiErrorResponse;
}

export interface IRequestEditJobAction {
  type: jobConstants.reqEditJob;
  payload: Partial<IJobRequest>;
}

export interface IReceiveEditJobAction {
  type: jobConstants.resEditJob;
  payload: IJob | IApiErrorResponse;
}

export interface IRequestListJobAction {
  type: jobConstants.reqListJob;
}

export interface IReceiveListJobAction {
  type: jobConstants.resListJob;
  payload: IJobSummary[] | IApiErrorResponse;
}

export interface IRequestGetJobAction {
  type: jobConstants.reqGetJob;
  payload: string;
}

export interface IReceiveGetJobAction {
  type: jobConstants.resGetJob;
  payload: IJob | IApiErrorResponse;
}

export interface IRequestDeleteJobAction {
  type: jobConstants.reqDeleteJob;
  payload: string;
}

export interface IReceiveDeleteJobAction {
  type: jobConstants.resDeleteJob;
  payload: IApiDeleteReponse | IApiErrorResponse;
}

export type JobAction =
  | IRequestCreateJobAction
  | IReceiveCreateJobAction
  | IRequestEditJobAction
  | IReceiveEditJobAction
  | IRequestListJobAction
  | IReceiveListJobAction
  | IRequestGetJobAction
  | IReceiveGetJobAction
  | IRequestDeleteJobAction
  | IReceiveDeleteJobAction
  | IClearErrorAction<jobConstants.clearError>;
