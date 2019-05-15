import AlgorithmList from "./AlgorithmList";

import {
  IAlgorithmListStateProps,
  IAlgorithmListDispatchProps,
} from "./AlgorithmList";
import {
  requestListAlgorithmAction,
} from "../../state/algorithm/algorithmActions";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Dispatch } from "redux";
import { IAppReduxState } from "../../types/global";

const mapStateToProps = (state: IAppReduxState): IAlgorithmListStateProps => ({
  loading: !!state.algorithm.loading,
  error: state.algorithm.error,
  list: state.algorithm.list,
});

const mapDispatchToProps = (
  dispatch: Dispatch,
): IAlgorithmListDispatchProps => ({
  requestListAlgorithm: (...params) =>
    dispatch(requestListAlgorithmAction(...params)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AlgorithmList),
);
