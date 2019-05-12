import { isApiErrorResponse } from "../../types/api";
import { jobConstants } from "./jobConstants";
import { IJobReduxState, JobAction } from "../../types/job";

const initialState: IJobReduxState = {};

export const jobReducer = (
  state: IJobReduxState = initialState,
  action: Partial<JobAction>,
): IJobReduxState => {
  const { error, loading, ...cleanState } = state;
  const { single, ...withoutSingle } = cleanState;
  switch (action.type) {
    case jobConstants.clearError:
      return {
        loading,
        ...cleanState,
      };
    case jobConstants.resCreateJob:
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
    case jobConstants.resEditJob:
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
    case jobConstants.resListJob:
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
    case jobConstants.resGetJob:
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
    case jobConstants.resDeleteJob:
      if (isApiErrorResponse(action.payload)) {
        return {
          ...cleanState,
          ...action.payload,
        };
      } else {
        
        return withoutSingle;
      }
    case jobConstants.reqEditJob:
    case jobConstants.reqListJob:
    case jobConstants.reqDeleteJob:
      return {
        ...cleanState,
        loading: true,
      };
    case jobConstants.reqCreateJob:
    case jobConstants.reqGetJob:
      return {
        ...withoutSingle,
        loading: true,
      };
    default:
      return state;
  }
};