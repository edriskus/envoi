import { isApiErrorResponse } from "../../types/api";
import { algorithmConstants } from "./algorithmConstants";
import { IAlgorithmReduxState, AlgorithmAction } from "../../types/algorithm";

const initialState: IAlgorithmReduxState = {};

export const algorithmReducer = (
  state: IAlgorithmReduxState = initialState,
  action: Partial<AlgorithmAction>,
): IAlgorithmReduxState => {
  const { error, loading, ...cleanState } = state;
  switch (action.type) {
    case algorithmConstants.clearError:
      return {
        loading,
        ...cleanState,
      };
    case algorithmConstants.resCreateAlgorithm:
      if (isApiErrorResponse(action.payload)) {
        return {
          ...cleanState,
          ...action.payload,
        };
      } else {
        return {
          ...cleanState,
          single: action.payload,
        };
      }
    case algorithmConstants.resEditAlgorithm:
      if (isApiErrorResponse(action.payload)) {
        return {
          ...cleanState,
          ...action.payload,
        };
      } else {
        return {
          ...cleanState,
          single: action.payload,
        };
      }
    case algorithmConstants.resListAlgorithm:
      if (isApiErrorResponse(action.payload)) {
        return {
          ...cleanState,
          ...action.payload,
        };
      } else {
        return {
          ...cleanState,
          list: action.payload,
        };
      }
    case algorithmConstants.resGetAlgorithm:
      if (isApiErrorResponse(action.payload)) {
        return {
          ...cleanState,
          ...action.payload,
        };
      } else {
        return {
          ...cleanState,
          single: action.payload,
        };
      }
    case algorithmConstants.resDeleteAlgorithm:
      if (isApiErrorResponse(action.payload)) {
        return {
          ...cleanState,
          ...action.payload,
        };
      } else {
        const { single, ...rest } = cleanState;
        return rest;
      }
    case algorithmConstants.reqCreateAlgorithm:
    case algorithmConstants.reqEditAlgorithm:
    case algorithmConstants.reqListAlgorithm:
    case algorithmConstants.reqGetAlgorithm:
    case algorithmConstants.reqDeleteAlgorithm:
      return {
        ...cleanState,
        loading: true,
      };
    default:
      return state;
  }
};