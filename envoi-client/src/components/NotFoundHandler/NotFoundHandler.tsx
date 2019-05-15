import React from "react";
import { Redirect } from "react-router";
import { IApiError } from "../../types/api";

export interface INoutFoundHandlerProps {
  error?: IApiError;
  to: string;
}

const NotFoundHandler: React.FunctionComponent<INoutFoundHandlerProps> = props => {
  const { error, to } = props;
  if (error && error.status === 404) {
    return <Redirect to={to} />;
  } else {
    return null;
  }
};

export default NotFoundHandler;