import React from "react";
import algorithmEditStyles from "./AlgorithmEdit.tss";
import FileRead from "../../components/FileRead/FileRead";

import {
  Grid,
  Card,
  Button,
  Switch,
  TextField,
  FormGroup,
  Typography,
  WithStyles,
  withStyles,
  CardContent,
  LinearProgress,
  FormControlLabel,
} from "@material-ui/core";
import { IApiError } from "../../types/api";
import { IAlgorithmRequest } from "../../types/algorithm";
import { RouteComponentProps } from "react-router";
import { hasError, formatError } from "../../helpers/validations";
import NotFoundHandler from "../../components/NotFoundHandler/NotFoundHandler";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export interface IAlgorithmEditStateProps {
  loading: boolean;
  error?: IApiError;
  algorithm?: Partial<IAlgorithmRequest>;
}

export interface IAlgorithmEditDispatchProps {
  clearError(): void;
  requestGetAlgorithm(algorithmId: string): void;
  requestEditAlgorithm(algorithm: Partial<IAlgorithmRequest>): void;
  requestCreateAlgorithm(algorithm: Partial<IAlgorithmRequest>): void;
}

type IAlgorithmEditStyleProps = WithStyles<typeof algorithmEditStyles>;

export interface IAlgorithmEditOwnProps {
  error?: IApiError;
}

export type IAlgorithmEditProps =
  RouteComponentProps<{ id?: string }> &
  IAlgorithmEditOwnProps &
  IAlgorithmEditStateProps &
  IAlgorithmEditDispatchProps &
  IAlgorithmEditStyleProps;

export interface IAlgorithmEditState {
  algorithm: Partial<IAlgorithmRequest>;
}

class AlgorithmEdit extends React.PureComponent<
  IAlgorithmEditProps,
  IAlgorithmEditState
> {
  state: IAlgorithmEditState = {
    algorithm: {
      title: "",
      description: "",
      inputs: "",
      outputs: "",
      gpu: false,
    },
  };

  componentDidMount() {
    const { match, requestGetAlgorithm, clearError } = this.props;
    const { params } = match;
    if (params.id) {
      requestGetAlgorithm(params.id);
    } else {
      clearError();
    }
  }

  componentWillUnmount() {
    const { clearError } = this.props;
    clearError();
  }

  componentDidUpdate(prevProps: IAlgorithmEditProps) {
    const { algorithm } = this.props;
    const stateAlgorithm = this.state.algorithm;
    if (prevProps.loading && !this.props.loading && algorithm) {
      this.setState({ 
        algorithm: { ...stateAlgorithm, ...algorithm } 
      });
    }
  }

  render() {
    const { algorithm } = this.state;
    const { error, classes, loading } = this.props;
    const { title, description, inputs, outputs, gpu } = algorithm;
    
    return (
      <Grid item={true} xs={12}>
        <NotFoundHandler 
          error={error}
          to="/algorithms"
        />
        <Typography variant="h3" gutterBottom={true}>
          Algorithm
        </Typography>
        <Card>
          <CardContent>
            <form onSubmit={this.handleSubmit}>
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
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={!!gpu}
                          value="active"
                          color="secondary"
                          onChange={this.handleGpuChange}
                        />
                      }
                      label="Use GPU (experimental)"
                    />
                  </FormGroup>
                  <div className={classes.fileReadWrapper}>
                    <FileRead
                      label="Block dispatcher"
                      description="Dispatcher generates job blocks for distribution"
                      onRead={this.handleFileRead}
                    />
                    <FileRead
                      label="Client runner"
                      description="Cient runner contains computational code"
                      onRead={this.handleFileRead}
                    />
                    <FileRead
                      label="Block reducer"
                      description="Reducer is run on each block before saving it to DB"
                      onRead={this.handleFileRead}
                    />
                  </div>
                </Grid>
                <Grid item={true} xs={12} md={6}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
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
                      shrink: true,
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
                  <div className={classes.buttonWrapper}>
                    <Button 
                      type="submit"
                      color="primary" 
                      disabled={loading}
                      variant="contained" 
                    >
                      Save
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </CardContent>
          {loading && <LinearProgress />}
        </Card>
      </Grid>
    );
  }

  private handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { match, requestCreateAlgorithm, requestEditAlgorithm } = this.props;
    const { algorithm } = this.state;
    const { params } = match;
    if (params.id) {
      requestEditAlgorithm(algorithm);
    } else {
      requestCreateAlgorithm(algorithm);
    }
  };

  private handleGpuChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { algorithm } = this.state;
    const { checked } = event.target;
    this.setState({
      algorithm: {
        ...algorithm,
        gpu: checked,
      },
    });
  };

  private handleChange = (
    name: "title" | "description" | "inputs" | "outputs",
  ) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { error, clearError } = this.props;
    const { algorithm } = this.state;
    const { value } = event.target;
    this.setState({
      algorithm: {
        ...algorithm,
        [name]: value,
      },
    } as any);
    if (error) {
      clearError();
    }
  };

  private handleTitleChange = this.handleChange("title");
  private handleDescriptionChange = this.handleChange("description");
  private handleInputsChange = this.handleChange("inputs");
  private handleOutputsChange = this.handleChange("outputs");

  private handleFileRead = (content: string | ArrayBuffer | null) => {
    console.log("File read", content);
  };
}

export default withStyles(algorithmEditStyles)(AlgorithmEdit);
