import Join from "./Join";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IAppReduxState } from "../../types/global";
import { IJoinDispatchProps, IJoinStateProps } from "./Join";

const mapStateToProps = (state: IAppReduxState): IJoinStateProps => ({
  loggedIn: !!state.user.token,
  loading: !!state.user.loading,
  error: state.user.error
});

const mapDispatchToProps = (dispatch: Dispatch): IJoinDispatchProps => ({
  requestJoin: (...params) => null
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Join);
