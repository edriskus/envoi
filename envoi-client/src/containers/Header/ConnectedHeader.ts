import Header from "./Header";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { mapUserData } from "../../state/user/userEnhancers";
import { removeTokenAction } from "../../state/user/userActions";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logOut: () => dispatch(removeTokenAction()),
});

export default connect(
  mapUserData,
  mapDispatchToProps,
)(Header);