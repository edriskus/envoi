import Dashboard from "./Dashboard";

import { connect } from "react-redux";
import { mapUserData } from "../../state/user/userEnhancers";

export default connect(
  mapUserData,
)(Dashboard);