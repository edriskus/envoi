import Join from "./Join";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IAppReduxState } from "../../types/global";
import { IJoinDispatchProps, IJoinStateProps } from "./Join";
import { requestRegisterAction, clearErrorAction } from "../../state/user/userActions";

const mapStateToProps = (state: IAppReduxState): IJoinStateProps => ({
  loggedIn: !!state.user.token,
  registered: !!state.user.registered,
  loading: !!state.user.loading,
  error: state.user.error,
});

const mapDispatchToProps = (dispatch: Dispatch): IJoinDispatchProps => ({
  requestJoin: (...params) => dispatch(requestRegisterAction(...params)),
  clearError: () => dispatch(clearErrorAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Join);
