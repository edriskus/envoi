import Header, { IHeaderDispatchProps } from "./Header";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { mapUserData } from "../../state/user/userEnhancers";
import { removeTokenAction, requestGetCreditsAction } from "../../state/user/userActions";

const mapDispatchToProps = (dispatch: Dispatch): IHeaderDispatchProps => ({
  logOut: () => dispatch(removeTokenAction()),
  getCredits: () => dispatch(requestGetCreditsAction()),
});

export default connect(
  mapUserData,
  mapDispatchToProps,
)(Header);