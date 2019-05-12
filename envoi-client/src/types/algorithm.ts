import { algorithmConstants } from "../state/algorithm/algorithmConstants";
import {
  IClearErrorAction,
  ILoadableReduxState,
  IApiErrorResponse,
  IApiDeleteReponse,
} from "./api";

export type IAlgorithmRequest = IAlgorithm;

export interface IAlgorithmSummary {
  _id: string;
  title: string;
  description: string;
  gpu: boolean;

  dispatcher: IFilePointerSummary;
  runner: IFilePointerSummary;
  reducer: IFilePointerSummary;
}

export interface IAlgorithm {
  _id?: string;
  title: string;
  description: string;
  inputs: string;
  outputs: string;
  gpu: boolean;
  dispatcher: IFilePointer;
  runner: IFilePointer;
  reducer: IFilePointer;
}

export interface IFilePointer {
  name: string;
  size: number;
  content?: string | ArrayBuffer | null;
}

export interface IFilePointerSummary {
  name: string;
  size: number;
}

export interface IAlgorithmReduxState extends ILoadableReduxState {
  list?: IAlgorithmSummary[];
  single?: IAlgorithm;
}

export interface IRequestCreateAlgorithmAction {
  type: algorithmConstants.reqCreateAlgorithm;
  payload: Partial<IAlgorithmRequest>;
}

export interface IReceiveCreateAlgorithmAction {
  type: algorithmConstants.resCreateAlgorithm;
  payload: IAlgorithm | IApiErrorResponse;
}

export interface IRequestEditAlgorithmAction {
  type: algorithmConstants.reqEditAlgorithm;
  payload: Partial<IAlgorithmRequest>;
}

export interface IReceiveEditAlgorithmAction {
  type: algorithmConstants.resEditAlgorithm;
  payload: IAlgorithm | IApiErrorResponse;
}

export interface IRequestListAlgorithmAction {
  type: algorithmConstants.reqListAlgorithm;
}

export interface IReceiveListAlgorithmAction {
  type: algorithmConstants.resListAlgorithm;
  payload: IAlgorithmSummary[] | IApiErrorResponse;
}

export interface IRequestGetAlgorithmAction {
  type: algorithmConstants.reqGetAlgorithm;
  payload: string;
}

export interface IReceiveGetAlgorithmAction {
  type: algorithmConstants.resGetAlgorithm;
  payload: IAlgorithm | IApiErrorResponse;
}

export interface IRequestDeleteAlgorithmAction {
  type: algorithmConstants.reqDeleteAlgorithm;
  payload: string;
}

export interface IReceiveDeleteAlgorithmAction {
  type: algorithmConstants.resDeleteAlgorithm;
  payload: IApiDeleteReponse | IApiErrorResponse;
}

export type AlgorithmAction =
  | IRequestCreateAlgorithmAction
  | IReceiveCreateAlgorithmAction
  | IRequestEditAlgorithmAction
  | IReceiveEditAlgorithmAction
  | IRequestListAlgorithmAction
  | IReceiveListAlgorithmAction
  | IRequestGetAlgorithmAction
  | IReceiveGetAlgorithmAction
  | IRequestDeleteAlgorithmAction
  | IReceiveDeleteAlgorithmAction
  | IClearErrorAction<algorithmConstants.clearError>;
