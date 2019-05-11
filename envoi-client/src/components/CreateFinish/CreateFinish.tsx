import React from "react";
import { Typography, Hidden } from "@material-ui/core";

const CreateFinish: React.FunctionComponent = () => (
  <>
    <Hidden xsDown={true}>
      <Typography variant="h2">All good!</Typography>
    </Hidden>
    <Hidden smUp={true}>
      <Typography variant="h3">All good!</Typography>
    </Hidden>
    <Typography variant="subtitle1">You can now manage your Job.</Typography>
  </>
);

export default CreateFinish;