import React from "react";

import { Typography } from "@material-ui/core";
import FakeText from "../FakeText/FakeText";
import FileDownload from "../FileDownload/FileDownload";

export interface IInfoProps {
  entity?: {
    title: string;
    description: string;
    finished?: boolean;
    results?: boolean;
  } | null;
}

const Info: React.FunctionComponent<IInfoProps> = props => {
  const { entity } = props;
  const { title, description, finished, results } = entity || {} as any;
  return (
    <>
      <Typography variant="h3">{title || <FakeText variant="heading" />}</Typography>
      <Typography variant="caption" gutterBottom={true}>
        21 April, 2019
      </Typography>
      <Typography variant="body1" gutterBottom={true}>
        {description  || <FakeText lines={5} />}
      </Typography>
      {finished && <FileDownload
        content={results && JSON.stringify(results)}
        fileName="results.json"
        label="Results"
        description="Download results from finished job run"
      />}
    </>
  );
};

export default Info;