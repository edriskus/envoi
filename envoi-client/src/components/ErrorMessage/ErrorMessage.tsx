import React from "react";

import { IApiError } from "../../types/api";
import { Typography } from "@material-ui/core";

export interface IErrorMessageProps {
  error?: IApiError;
}

const ErrorMessage: React.FunctionComponent<IErrorMessageProps> = props => {
  const { error } = props;
  if (!error || !error.message) {
    return null;
  }
  return (
    <Typography 
      align="center"
      color="error"
      variant="subtitle2"
    >
      {error.message}
    </Typography>
  );
};

export default ErrorMessage;