import React from "react";
import Landing from "../Landing/Landing";
import JobEdit from "../JobEdit/JobEdit";
import Settings from "../Settings/Settings";
import JobCreate from "../JobCreate/JobCreate";
import ConnectedJoin from "../Join/ConnectedJoin";
import ConnectedLogin from "../Login/ConnectedLogin";
import ConnectedJobList from "../JobList/ConnectedJobList";
import ConnectedDashboard from "../Dashboard/ConnectedDashboard";
import ConnectedAlgorithmEdit from "../AlgorithmEdit/ConnectedAlgorithmEdit";
import ConnectedAlgorithmList from "../AlgorithmList/ConnectedAlgorithmList";

import { IUserData } from "../../types/user";
import { Route, Redirect, Switch } from "react-router";
import ConnectedJobView from "../JobView/ConnectedJobView";
import ConnectedJobCreate from "../JobCreate/ConnectedJobCreate";

const Routes: React.FunctionComponent<IUserData> = (props: IUserData) => {
  const { loggedIn } = props;
  return (
    <Switch>
      {loggedIn && [
        <Route key={0} path="/" exact={true} component={ConnectedDashboard} />,
        <Route key={1} path="/settings" exact={true} component={Settings} />,

        <Route key={2} path="/jobs" exact={true} component={ConnectedJobList} />,
        <Route
          key={3}
          path="/jobs/create"
          exact={true}
          component={ConnectedJobCreate}
        />,
        <Route key={4} path="/jobs/:id" exact={true} component={ConnectedJobView} />,
        <Route
          key={5}
          path="/jobs/:id/edit"
          exact={true}
          component={JobEdit}
        />,

        <Route
          key={6}
          path="/algorithms"
          exact={true}
          component={ConnectedAlgorithmList}
        />,
        <Route
          key={7}
          path="/algorithms/create"
          exact={true}
          component={ConnectedAlgorithmEdit}
        />,
        <Route
          key={8}
          path="/algorithms/:id/edit"
          exact={true}
          component={ConnectedAlgorithmEdit}
        />,
      ]}

      {!loggedIn && [
        <Route key={0} path="/" exact={true} component={Landing} />,
        <Route key={1} path="/login" exact={true} component={ConnectedLogin} />,
        <Route key={2} path="/join" exact={true} component={ConnectedJoin} />,
      ]}

      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
