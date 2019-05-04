import React from "react";

import { Typography } from "@material-ui/core";

const Info: React.FunctionComponent = () => (
  <>
    <Typography variant="h3">Title</Typography>
    <Typography variant="caption" gutterBottom={true}>
      21 April, 2019
    </Typography>
    <Typography variant="body1">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
      deserunt mollit anim id est laborum.
    </Typography>
  </>
)

export default Info;