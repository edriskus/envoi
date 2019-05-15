import React from "react";

import { Code } from "@material-ui/icons";
import { displayFileSize } from "../../helpers/algorithm";
import { IFilePointerSummary } from "../../types/algorithm";
import { Typography } from "@material-ui/core";

export interface IFileInfoProps {
  filePointer?: IFilePointerSummary | null;
}

const FileInfo: React.FunctionComponent<IFileInfoProps> = props => {
  const { filePointer } = props;
  if (!filePointer || !filePointer.size) {
    return null;
  } else {
    return (
      <Typography>
        {displayFileSize(filePointer.size)}
      </Typography>
    );
  }
};

export default FileInfo;