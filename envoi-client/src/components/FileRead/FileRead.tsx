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
import { IFilePointer } from "../../types/algorithm";
import { CloudUpload, CloudDone } from "@material-ui/icons";

export interface IFileReadOwnProps {
  label: string;
  sizeLimit: number;
  description?: string;
  error?: string | null;
  value?: IFilePointer;
  onChange(file: IFilePointer | null): void;
}

type IFileReadStyleProps = WithStyles<typeof fileReadStyles>;

export type IFileReadProps = IFileReadOwnProps & IFileReadStyleProps;

export interface IFileReadState {
  loading: boolean;
  error: string | null;
}

class FileRead extends React.PureComponent<IFileReadProps, IFileReadState> {

  static defaultProps: Partial<IFileReadProps> = {
    sizeLimit: 1024 * 1024,
  };

  state: IFileReadState = {
    error: null,
    loading: false,
  };
  private uniqueId = uuidv4();
  private inputRef = React.createRef<HTMLInputElement>();

  render() {
    const { classes, label, description, value } = this.props;
    const { name } = value || {} as any;

    const error = this.props.error || this.state.error;
    const hasFile = !!name;
    const variant = hasFile ? "default" : "outlined";
    const color = hasFile ? "primary" : "default";
    const chipLabel = name || "Click to upload";
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
        reader.onloadend = this.handleFileRead(reader, files[0].name, files[0].size);
        reader.readAsText(files[0]);
      }
    } else {
      console.warn("Files API not supported", files);
    }
  };

  private handleDelete = (event: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      const { onChange } = this.props;
      if (this.inputRef && this.inputRef.current) {
        this.inputRef.current.value = "";
        this.setState({
          error: null,
        });
        if (typeof onChange === "function") {
          onChange(null);
        }
      }
    }
  };

  private handleFileRead = (reader: FileReader, fileName: string, size: number) => (
    ev: ProgressEvent,
  ) => {
    const { onChange } = this.props;
    const content = reader.result;
    if (typeof onChange === "function") {
      onChange({
        content,
        name: fileName,
        size,
      });
    }
    this.setState({
      loading: false,
      error: null,
    });
  };
}

export default withStyles(fileReadStyles)(FileRead);
