import JobView from "./JobView";

import {
  requestGetJobAction,
  requestDeleteJobAction,
  clearJobAction,
} from "../../state/job/jobActions";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { IAppReduxState } from "../../types/global";
import { IJobViewDispatchProps, IJobViewStateProps } from "./JobView";
import { requestGetCreditsAction } from "../../state/user/userActions";

const mapStateToProps = (state: IAppReduxState): IJobViewStateProps => ({
  loading: !!state.job.loading,
  error: state.job.error,
  job: state.job.single,
  userId: state.user._id,
});

const mapDispatchToProps = (
  dispatch: Dispatch,
): IJobViewDispatchProps => ({
  requestGetCredits: () => dispatch(requestGetCreditsAction()),
  clearJob: () => dispatch(clearJobAction()),
  requestGetJob: (...params) =>
    dispatch(requestGetJobAction(...params)),
  requestDeleteJob: (...params) =>
    dispatch(requestDeleteJobAction(...params)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(JobView),
);
