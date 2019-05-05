import React from "react";

import { Grid, Paper, Typography } from "@material-ui/core";

const Settings: React.FunctionComponent = () => {
  return (
    <Grid item={true} xs={12}>
      <Typography variant="h3" gutterBottom={true}>
        My Account
      </Typography>
      <Paper>...</Paper>
    </Grid>
  );
};

export default Settings;
