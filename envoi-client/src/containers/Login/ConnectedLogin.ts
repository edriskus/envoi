import Login from "./Login";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IAppReduxState } from "../../types/global";
import { ILoginDispatchProps, ILoginStateProps } from "./Login";
import { requestLoginAction, clearErrorAction } from "../../state/user/userActions";

const mapStateToProps = (state: IAppReduxState): ILoginStateProps => ({
  loggedIn: !!state.user.token,
  loading: !!state.user.loading,
  error: state.user.error
});

const mapDispatchToProps = (dispatch: Dispatch): ILoginDispatchProps => ({
  requestLogin: (...params) => dispatch(requestLoginAction(...params)),
  clearError: () => dispatch(clearErrorAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
