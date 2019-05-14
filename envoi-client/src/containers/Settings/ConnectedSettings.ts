import Settings, { ISettingsDispatchProps } from "./Settings";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { mapUserData } from "../../state/user/userEnhancers";
import { requestGetCreditsAction } from "../../state/user/userActions";

const mapDispatchToProps = (dispatch: Dispatch): ISettingsDispatchProps => ({
  getCredits: () => dispatch(requestGetCreditsAction()),
});

export default connect(
  mapUserData,
  mapDispatchToProps,
)(Settings);