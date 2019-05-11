import React from "react";
import { Typography, Hidden } from "@material-ui/core";

const AlgorithmChooser: React.FunctionComponent = () => (
  <>
    <Hidden xsDown={true}>
      <Typography variant="h2">Choose an algorithm</Typography>
    </Hidden>
    <Hidden smUp={true}>
      <Typography variant="h3">Choose an algorithm</Typography>
    </Hidden>
  </>
);

export default AlgorithmChooser;