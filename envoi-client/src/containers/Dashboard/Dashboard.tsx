import React from "react";
import dashboardStyles from "./Dashboard.tss";

import {
  Grid,
  Paper,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import { IUserData } from "../../types/user";

type IDashboardStyleProps = WithStyles<typeof dashboardStyles>;

type IDashboardProps = IUserData & IDashboardStyleProps;

const Dashboard: React.FunctionComponent<IDashboardProps> = (
  props: IDashboardProps
) => {
  const {
    user: { firstName }
  } = props;
  return (
    <>
      <Grid xs={12} item={true}>
        <Typography variant="h2" align="center">
          Envoi.ts
        </Typography>
        <Typography variant="h5" align="center">
          Welcome back, {firstName}!
        </Typography>
      </Grid>
      <Grid xs={12} md={6} item={true}>
        <Paper>...</Paper>
      </Grid>
      <Grid xs={12} md={6} item={true}>
        <Paper>...</Paper>
      </Grid>
    </>
  );
};

export default withStyles(dashboardStyles)(Dashboard);
