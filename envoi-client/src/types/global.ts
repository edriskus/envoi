import { IJobReduxState } from "./job";
import { IUserReduxState } from "./user";
import { IAlgorithmReduxState } from "./algorithm";

export interface IAppReduxState {
  job: IJobReduxState;
  user: IUserReduxState;
  algorithm: IAlgorithmReduxState;
}
