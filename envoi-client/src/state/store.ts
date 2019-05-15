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
  const enhancerFns = [applyMiddleware(sagaMiddleware)];
  if ((window as any).__REDUX_DEVTOOLS_EXTENSION__) {
    enhancerFns.push((window as any).__REDUX_DEVTOOLS_EXTENSION__());
  }
  const enhancers = compose(...enhancerFns) as any;
  const store = createStore(appReducers, initialState, enhancers);
  sagaMiddleware.run(rootSaga);
  return store;
}
