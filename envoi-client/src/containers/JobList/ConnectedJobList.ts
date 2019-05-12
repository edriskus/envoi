import JobList from "./JobList";

import {
  IJobListStateProps,
  IJobListDispatchProps,
} from "./JobList";
import {
  requestListJobAction,
} from "../../state/job/jobActions";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Dispatch } from "redux";
import { IAppReduxState } from "../../types/global";

const mapStateToProps = (state: IAppReduxState): IJobListStateProps => ({
  loading: !!state.job.loading,
  error: state.job.error,
  list: state.job.list,
});

const mapDispatchToProps = (
  dispatch: Dispatch,
): IJobListDispatchProps => ({
  requestListJob: (...params) =>
    dispatch(requestListJobAction(...params)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(JobList),
);
