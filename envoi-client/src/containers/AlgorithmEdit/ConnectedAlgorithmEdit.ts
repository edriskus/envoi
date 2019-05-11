import AlgorithmEdit from "./AlgorithmEdit";

import {
  IAlgorithmEditStateProps,
  IAlgorithmEditDispatchProps,
} from "./AlgorithmEdit";
import {
  requestEditAlgorithmAction,
  requestCreateAlgorithmAction,
  requestGetAlgorithmAction,
  clearErrorAction,
} from "../../state/algorithm/algorithmActions";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Dispatch, compose } from "redux";
import { IAppReduxState } from "../../types/global";

const mapStateToProps = (state: IAppReduxState): IAlgorithmEditStateProps => ({
  loading: !!state.algorithm.loading,
  error: state.algorithm.error,
  algorithm: state.algorithm.single,
});

const mapDispatchToProps = (
  dispatch: Dispatch,
): IAlgorithmEditDispatchProps => ({
  clearError: () => dispatch(clearErrorAction()),
  requestGetAlgorithm: (...params) =>
    dispatch(requestGetAlgorithmAction(...params)),
  requestEditAlgorithm: (...params) =>
    dispatch(requestEditAlgorithmAction(...params)),
  requestCreateAlgorithm: (...params) =>
    dispatch(requestCreateAlgorithmAction(...params)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AlgorithmEdit),
);
