import React from "react";
import uuidv4 from "uuid/v4";
import fileReadStyles from "./FileRead.tss";

import {
  Chip,
  Avatar,
  FormLabel,
  withStyles,
  WithStyles,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { CloudUpload, CloudDone } from "@material-ui/icons";

export interface IFileReadOwnProps {
  label: string;
  error?: string;
  sizeLimit: number;
  description?: string;
  onRead(content: string | ArrayBuffer | null): void;
}

type IFileReadStyleProps = WithStyles<typeof fileReadStyles>;

export type IFileReadProps = IFileReadOwnProps & IFileReadStyleProps;

export interface IFileReadState {
  loading: boolean;
  error: string | null;
  fileName: string | null;
  content: string | ArrayBuffer | null;
}

class FileRead extends React.PureComponent<IFileReadProps, IFileReadState> {

  static defaultProps: Partial<IFileReadProps> = {
    sizeLimit: 1024 * 1024,
  };

  state: IFileReadState = {
    error: null,
    loading: false,
    fileName: null,
    content: null,
  };
  private uniqueId = uuidv4();
  private inputRef = React.createRef<HTMLInputElement>();

  render() {
    const { content, fileName } = this.state;
    const { classes, label, description } = this.props;

    const error = this.props.error || this.state.error;
    const hasFile = !!content;
    const variant = hasFile ? "default" : "outlined";
    const color = hasFile ? "primary" : "default";
    const chipLabel = fileName || "Click to upload";
    const cloudIcon = hasFile ? (
      <CloudDone />
    ) : (
      <CloudUpload />
    );

    return (
      <FormControl 
        error={!!error}
        className={classes.mainWrapper}
      >
        <FormLabel
          className={classes.formLabel}
        >
          {label}
        </FormLabel>
        <div>
          <label>
            <input
              type="file"
              ref={this.inputRef}
              onChange={this.handleChange}
              name={`file-${this.uniqueId}`}
              className={classes.hiddenInput}
              id={`file-read-${this.uniqueId}`}
            />
            <Chip
              color={color}
              label={chipLabel}
              variant={variant}
              onClick={this.handleClick}
              avatar={
                <Avatar>
                  {cloudIcon}
                </Avatar>
              }
              onDelete={hasFile ? this.handleDelete : undefined}
            />
          </label>
        </div>
        {!error && !!description && 
          <FormHelperText
            className={classes.description}
          >{description}</FormHelperText>
        }
        {!!error && <FormHelperText
          className={classes.description}
        >{error}</FormHelperText>}
      </FormControl>
    );
  }

  private handleClick = () => {
    if (this.inputRef && this.inputRef.current) {
      this.inputRef.current.focus();
    }
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { sizeLimit } = this.props;
    const { files } = event.target;
    if (files && files[0]) {
      const reader = new FileReader();
      if (files[0].size > sizeLimit) {
        this.setState({
          error: `File must be smaller than ${Math.floor(sizeLimit / 1024)} kB`,
        });
      } else {
        this.setState({
          loading: true,
          error: null,
        });
        reader.onloadend = this.handleFileRead(reader, files[0].name);
        reader.readAsText(files[0]);
      }
    } else {
      console.warn("Files not supported", files);
    }
  };

  private handleDelete = (event: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      if (this.inputRef && this.inputRef.current) {
        this.inputRef.current.value = "";
        this.setState({
          content: null,
          fileName: null,
          error: null,
        });
      }
    }
  };

  private handleFileRead = (reader: FileReader, fileName: string) => (
    ev: ProgressEvent,
  ) => {
    const { onRead } = this.props;
    const content = reader.result;
    if (typeof onRead === "function") {
      onRead(content);
    }
    this.setState({
      loading: false,
      content,
      fileName,
      error: null,
    });
  };
}

export default withStyles(fileReadStyles)(FileRead);
