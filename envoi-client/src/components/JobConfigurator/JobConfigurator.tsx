import React from "react";
import { Typography, Hidden } from "@material-ui/core";

const JobConfigurator: React.FunctionComponent = () => (
  <>
    <Hidden xsDown={true}>
      <Typography variant="h2">Configure job</Typography>
    </Hidden>
    <Hidden smUp={true}>
      <Typography variant="h3">Configure job</Typography>
    </Hidden>
  </>
)

export default JobConfigurator;