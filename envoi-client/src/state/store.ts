import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./sagas";
import { getAppReducers } from "./reducers";
import { IAppReduxState } from "../types/global";
import { applyMiddleware, compose, createStore, Store } from "redux";

export function configStore(
  initialState: Partial<IAppReduxState> = {},
): Store<IAppReduxState> {
  const appReducers = getAppReducers();
  const sagaMiddleware = createSagaMiddleware();
  const enhancers = compose(applyMiddleware(sagaMiddleware));
  const store = createStore(appReducers, initialState, enhancers);
  sagaMiddleware.run(rootSaga);
  return store;
}
