import React from "react";
import fileSaver from "file-saver";
import fileDownloadStyles from "./FileDownload.tss";

import {
  Chip,
  Avatar,
  FormLabel,
  withStyles,
  WithStyles,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { Attachment } from "@material-ui/icons";

export interface IFileDownloadOwnProps {
  label: string;
  content?: string;
  fileName: string;
  description: string;
}

type IFileDownloadStyleProps = WithStyles<typeof fileDownloadStyles>;

type IFileDownloadProps = IFileDownloadOwnProps & IFileDownloadStyleProps;

class FileDownload extends React.PureComponent<IFileDownloadProps> {
  render() {
    const { classes, label, fileName, description } = this.props;
    return (
      <FormControl className={classes.mainWrapper}>
        <FormLabel className={classes.formLabel}>{label}</FormLabel>
        <div>
          <Chip
            color="secondary"
            label={fileName}
            variant="default"
            onClick={this.handleClick}
            avatar={
              <Avatar>
                <Attachment />
              </Avatar>
            }
          />
        </div>
        <FormHelperText className={classes.description}>
          {description}
        </FormHelperText>
      </FormControl>
    );
  }

  private handleClick = () => {
    const { content, fileName } = this.props;
    let fileContent: string;
    let fileType: string = "text/plain";
    try {
      fileContent = JSON.stringify(JSON.parse(`${content}`), null, 2);
      fileType = "application/json";
    } catch (e) { 
      fileContent = content || "";
    }
    const blob = new Blob([fileContent], {
      type: `${fileType};charset=utf-8`,
    });
    fileSaver.saveAs(blob, fileName);
  };
}

export default withStyles(fileDownloadStyles)(FileDownload);
