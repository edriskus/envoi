
import JobCreate from "./JobCreate";

import {
  IJobCreateStateProps,
  IJobCreateDispatchProps,
} from "./JobCreate";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IAppReduxState } from "../../types/global";
import { requestListAlgorithmAction } from "../../state/algorithm/algorithmActions";
import { clearErrorAction, requestCreateJobAction } from "../../state/job/jobActions";

const mapStateToProps = (state: IAppReduxState): IJobCreateStateProps => ({
  job: state.job.single,
  error: state.job.error,
  loading: !!state.job.loading,
  algorithmList: state.algorithm.list,
  algorithmsLoading: !!state.algorithm.loading,
});

const mapDispatchToProps = (
  dispatch: Dispatch,
): IJobCreateDispatchProps => ({
  clearError: () => dispatch(clearErrorAction()),
  requestListAlgorithm: (...params) =>
    dispatch(requestListAlgorithmAction(...params)),
  requestCreateJob: (...params) => 
    dispatch(requestCreateJobAction(...params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobCreate);
