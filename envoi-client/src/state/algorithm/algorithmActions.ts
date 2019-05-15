import {
  IApiErrorResponse,
  IApiDeleteReponse,
  IClearErrorAction,
} from "../../types/api";
import {
  IAlgorithm,
  IAlgorithmSummary,
  IAlgorithmRequest,
  IReceiveGetAlgorithmAction,
  IRequestGetAlgorithmAction,
  IRequestEditAlgorithmAction,
  IRequestListAlgorithmAction,
  IReceiveListAlgorithmAction,
  IReceiveEditAlgorithmAction,
  IReceiveCreateAlgorithmAction,
  IRequestDeleteAlgorithmAction,
  IRequestCreateAlgorithmAction,
  IReceiveDeleteAlgorithmAction,
} from "../../types/algorithm";
import { algorithmConstants } from "./algorithmConstants";

export const clearErrorAction = (): IClearErrorAction<
  algorithmConstants.clearError
> => ({
  type: algorithmConstants.clearError,
});

export const requestCreateAlgorithmAction = (
  payload: Partial<IAlgorithmRequest>,
): IRequestCreateAlgorithmAction => ({
  type: algorithmConstants.reqCreateAlgorithm,
  payload,
});

export const receiveCreateAlgorithmAction = (
  payload: IAlgorithm | IApiErrorResponse,
): IReceiveCreateAlgorithmAction => ({
  type: algorithmConstants.resCreateAlgorithm,
  payload,
});

export const requestEditAlgorithmAction = (
  payload: Partial<IAlgorithmRequest>,
): IRequestEditAlgorithmAction => ({
  type: algorithmConstants.reqEditAlgorithm,
  payload,
});

export const receiveEditAlgorithmAction = (
  payload: IAlgorithm | IApiErrorResponse,
): IReceiveEditAlgorithmAction => ({
  type: algorithmConstants.resEditAlgorithm,
  payload,
});

export const requestListAlgorithmAction = (): IRequestListAlgorithmAction => ({
  type: algorithmConstants.reqListAlgorithm,
});
export const receiveListAlgorithmAction = (
  payload: IAlgorithmSummary[] | IApiErrorResponse,
): IReceiveListAlgorithmAction => ({
  type: algorithmConstants.resListAlgorithm,
  payload,
});

export const requestGetAlgorithmAction = (
  algorithmId: string,
): IRequestGetAlgorithmAction => ({
  type: algorithmConstants.reqGetAlgorithm,
  payload: algorithmId,
});

export const receiveGetAlgorithmAction = (
  payload: IAlgorithm | IApiErrorResponse,
): IReceiveGetAlgorithmAction => ({
  type: algorithmConstants.resGetAlgorithm,
  payload,
});

export const requestDeleteAlgorithmAction = (
  algorithmId: string,
): IRequestDeleteAlgorithmAction => ({
  type: algorithmConstants.reqDeleteAlgorithm,
  payload: algorithmId,
});

export const receiveDeleteAlgorithmAction = (
  payload: IApiDeleteReponse | IApiErrorResponse,
): IReceiveDeleteAlgorithmAction => ({
  type: algorithmConstants.resDeleteAlgorithm,
  payload,
});
