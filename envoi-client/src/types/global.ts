import { IUserReduxState } from "./user";
import { IAlgorithmReduxState } from "./algorithm";

export interface IAppReduxState {
  user: IUserReduxState;
  algorithm: IAlgorithmReduxState;
}
