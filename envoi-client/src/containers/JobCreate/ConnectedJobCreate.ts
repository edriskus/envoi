
import JobCreate from "./JobCreate";

import {
  IJobCreateStateProps,
  IJobCreateDispatchProps,
} from "./JobCreate";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IAppReduxState } from "../../types/global";
import { requestListAlgorithmAction } from "../../state/algorithm/algorithmActions";

const mapStateToProps = (state: IAppReduxState): IJobCreateStateProps => ({
  algorithmsLoading: !!state.algorithm.loading,
  loading: !!state.job.loading,
  error: state.job.error,
  algorithmList: state.algorithm.list,
});

const mapDispatchToProps = (
  dispatch: Dispatch,
): IJobCreateDispatchProps => ({
  requestListAlgorithm: (...params) =>
    dispatch(requestListAlgorithmAction(...params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobCreate);
