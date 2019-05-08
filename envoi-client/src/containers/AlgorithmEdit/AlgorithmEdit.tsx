import React from "react";

import {
  Grid,
  Card,
  Button,
  Switch,
  TextField,
  FormGroup,
  Typography,
  CardContent,
  FormControlLabel,
} from "@material-ui/core";
import { IApiError } from "../../types/api";
import { IAlgorithmRequest } from "../../types/algorithms";
import { hasError, formatError } from "../../helpers/validations";

export interface IAlgorithmEditProps {
  error?: IApiError;
}

export interface IAlgorithmEditState {
  algorithm: Partial<IAlgorithmRequest>;
}

class AlgorithmEdit extends React.PureComponent<
  IAlgorithmEditProps,
  IAlgorithmEditState
> {
  state: IAlgorithmEditState = {
    algorithm: {}
  };

  render() {
    const { algorithm } = this.state;
    const { error } = this.props;
    const { title, description, inputs, outputs, gpu } = algorithm;
    return (
      <Grid item={true} xs={12}>
        <Typography variant="h3" gutterBottom={true}>
          Algorithm
        </Typography>
        <Card>
          <CardContent>
            <form onSubmit={this.handleSubmit}>
              <Grid container={true} spacing={16}>
                <Grid item={true} xs={12} md={6}>
                  <TextField
                    InputLabelProps={{
                      shrink: true
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
                      shrink: true
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
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={gpu}
                          value="active"
                          color="secondary"
                          onChange={this.handleGpuChange}
                        />
                      }
                      label="Use GPU (experimental)"
                    />
                  </FormGroup>
                </Grid>
                <Grid item={true} xs={12} md={6}>
                  <TextField
                    InputLabelProps={{
                      shrink: true
                    }}
                    multiline={true}
                    rows={7}
                    fullWidth={true}
                    error={hasError("inputs", error)}
                    helperText={formatError("inputs", error)}
                    label="Input data structure"
                    value={inputs}
                    name="inputs"
                    onChange={this.handleInputsChange}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    InputLabelProps={{
                      shrink: true
                    }}
                    multiline={true}
                    rows={7}
                    fullWidth={true}
                    error={hasError("outputs", error)}
                    helperText={formatError("outputs", error)}
                    label="Output data structure"
                    value={outputs}
                    name="outputs"
                    onChange={this.handleOutputsChange}
                    margin="normal"
                    variant="outlined"
                  />
                  <Button variant="contained" color="primary" type="submit">
                    Save
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  private handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  private handleGpuChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { algorithm } = this.state;
    const { checked } = event.target;
    this.setState({
      algorithm: {
        ...algorithm,
        gpu: checked
      }
    });
  };

  private handleChange = (
    name: "title" | "description" | "inputs" | "outputs"
  ) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { algorithm } = this.state;
    const { value } = event.target;
    this.setState({
      algorithm: {
        ...algorithm,
        [name]: value
      }
    } as any);
  };

  private handleTitleChange = this.handleChange("title");
  private handleDescriptionChange = this.handleChange("description");
  private handleInputsChange = this.handleChange("inputs");
  private handleOutputsChange = this.handleChange("outputs");
}

export default AlgorithmEdit;
