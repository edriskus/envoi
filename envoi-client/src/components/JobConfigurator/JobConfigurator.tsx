import React from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { IApiError } from "../../types/api";
import { IJobRequest } from "../../types/job";
import { IAlgorithmSummary, IFilePointer } from "../../types/algorithm";
import { hasError, formatError } from "../../helpers/validations";
import { Typography, Hidden, Grid, TextField } from "@material-ui/core";
import FileRead from "../FileRead/FileRead";
import FileDownload from "../FileDownload/FileDownload";

export interface IJobConfiguratorProps {
  error?: IApiError;
  job?: Partial<IJobRequest>;
  algorithm?: IAlgorithmSummary;
  clearError(): void;
  onUpdate(job: Partial<IJobRequest>): void;
}

class JobConfigurator extends React.PureComponent<IJobConfiguratorProps> {
  render() {
    const { error, job, algorithm } = this.props;
    const { 
      inputs,
      title = "", 
      description = "", 
    } = job || {
      title: "",
      inputs: null,
      description: "",
    };
    return (
      <>
        <Hidden xsDown={true}>
          <Typography variant="h2" gutterBottom={true}>Configure job</Typography>
        </Hidden>
        <Hidden smUp={true}>
          <Typography variant="h3" gutterBottom={true}>Configure job</Typography>
        </Hidden>
        <ErrorMessage error={error} />
        <Grid container={true} spacing={16}>
          <Grid item={true} xs={12} md={6}>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              error={hasError("title", error)}
              helperText={formatError("title", error)}
              label="Title"
              value={title}
              name="title"
              onChange={this.handleTitleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              multiline={true}
              fullWidth={true}
              error={hasError("description", error)}
              helperText={formatError("description", error)}
              label="Description"
              value={description}
              name="description"
              onChange={this.handleDescriptionChange}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item={true} xs={12} md={6}>
            <FileDownload 
              content={algorithm && algorithm.inputs}
              fileName="inputs.json"
              label="Input data structure"
              description="Use this file as a starting point for input data file"
            />
            <FileRead
              label="Input data"
              error={formatError("inputs", error)}
              description="Algorithms use this data to produce results"
              value={inputs}
              onChange={this.handleInputsChange}
            />
          </Grid>
        </Grid>
      </>
    );
  }

  private handleChange = (
    name: "title" | "description" | "inputs",
  ) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { job, error, clearError, onUpdate } = this.props;
    const { value } = event.target;
    onUpdate({
      ...job,
      [name]: value,
    } as any);
    if (error) {
      clearError();
    }
  };

  private handleInputsChange = (
    file: IFilePointer | null,
  ) => {
    const { job, error, clearError, onUpdate } = this.props;
    onUpdate({
      ...job,
      inputs: file,
    } as any);
    if (error) {
      clearError();
    }
  };

  private handleTitleChange = this.handleChange("title");
  private handleDescriptionChange = this.handleChange("description");
}

export default JobConfigurator;