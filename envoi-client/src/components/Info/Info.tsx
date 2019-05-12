import React from "react";

import { Typography } from "@material-ui/core";
import FakeText from "../FakeText/FakeText";

export interface IInfoProps {
  entity?: {
    title: string;
    description: string;
  } | null;
}

const Info: React.FunctionComponent<IInfoProps> = props => {
  const { entity } = props;
  const { title, description } = entity || {} as any;
  return (
    <>
      <Typography variant="h3">{title || <FakeText variant="heading" />}</Typography>
      <Typography variant="caption" gutterBottom={true}>
        21 April, 2019
      </Typography>
      <Typography variant="body1">
        {description  || <FakeText lines={5} />}
      </Typography>
    </>
  );
};

export default Info;