import React from "react";
import Landing from '../Landing/Landing';
import JobList from '../JobList/JobList';
import JobEdit from '../JobEdit/JobEdit';
import Settings from "../Settings/Settings";
import JobRunner from '../JobRunner/JobRunner';
import ConnectedLogin from "../Login/ConnectedLogin";
import AlgorithmList from '../AlgorithmList/AlgorithmList';
import ConnectedDashboard from "../Dashboard/ConnectedDashboard";

import { IUserData } from "../../types/user";
import { Route, Redirect, Switch } from "react-router";

const Routes: React.FunctionComponent<IUserData> = (
  props: IUserData
) => {
  const { loggedIn } = props;
  return (
    <Switch>
      {loggedIn && [
        <Route key={0} path="/" exact={true} component={ConnectedDashboard} />,
        <Route key={1} path="/settings" exact={true} component={Settings} />,

        <Route key={2} path="/jobs" exact={true} component={JobList} />,
        <Route key={3} path="/jobs/:id" exact={true} component={JobRunner} />,
        <Route key={4} path="/jobs/:id/edit" exact={true} component={JobEdit} />,

        <Route key={5} path="/algorithms" exact={true} component={AlgorithmList} />
      ]}

      {!loggedIn && [
        <Route key={0} path="/" exact={true} component={Landing} />,
        <Route key={1} path="/login" exact={true} component={ConnectedLogin} />
      ]}
      
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes;