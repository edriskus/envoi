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
import { RouteComponentProps } from "react-router";
import { IAlgorithmRequest, IFilePointer } from "../../types/algorithm";
import { hasError, formatError } from "../../helpers/validations";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import NotFoundHandler from "../../components/NotFoundHandler/NotFoundHandler";
import DelayButton from "../../components/DelayButton/DelayButton";

export interface IAlgorithmEditStateProps {
  loading: boolean;
  error?: IApiError;
  algorithm?: Partial<IAlgorithmRequest>;
}

export interface IAlgorithmEditDispatchProps {
  clearError(): void;
  requestGetAlgorithm(algorithmId: string): void;
  requestDeleteAlgorithm(algorithmId: string): void;
  requestEditAlgorithm(algorithm: Partial<IAlgorithmRequest>): void;
  requestCreateAlgorithm(algorithm: Partial<IAlgorithmRequest>): void;
}

type IAlgorithmEditStyleProps = WithStyles<typeof algorithmEditStyles>;

export interface IAlgorithmEditOwnProps {
  error?: IApiError;
}

export type IAlgorithmEditProps = RouteComponentProps<{ id?: string }> &
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
      inputs: "{\n  \n}",
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
    const { algorithm, history, match, loading, error } = this.props;
    const { params } = match;
    const stateAlgorithm = this.state.algorithm;
    
    if (prevProps.loading && !loading) {
      if (algorithm) {
        if (algorithm._id && !params.id) {
          history.push(`/algorithms/${algorithm._id}/edit`);
        }
        this.setState({
          algorithm: { ...stateAlgorithm, ...algorithm },
        });
      } else if (!error) {
        history.goBack();
      }
    }
  }

  render() {
    const { algorithm } = this.state;
    const { error, classes, loading, match } = this.props;
    const { params } = match;
    const {
      gpu,
      title,
      inputs,
      runner,
      reducer,
      dispatcher,
      description,
    } = algorithm;

    const isNew = !params.id;

    return (
      <Grid item={true} xs={12}>
        <NotFoundHandler error={error} to="/algorithms" />
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
                      error={formatError("dispatcher", error)}
                      description={`Dispatcher generates job blocks for distribution.
                        Uses index (block number) and inputs (job inputs) as context variables.
                        Returns inputs data for a single block of a given index.`}
                      value={dispatcher}
                      onChange={this.handleDispatcherChange}
                    />
                    <FileRead
                      label="Client runner"
                      error={formatError("runner", error)}
                      description={`Cient runner contains computational code.
                        Uses inputs (job inputs) and 
                        reportProgress (funtion accepting 0 - 100) as context variables.
                        Returns results data for computed block.`}
                      value={runner}
                      onChange={this.handleRunnerChange}
                    />
                    <FileRead
                      label="Block reducer"
                      error={formatError("reducer", error)}
                      description={`Reducer is run on each block before saving it to DB.
                        Uses accumulator (job results state), value (block result data), inputs as context variables.
                        Returns object { results (new state), finished (boolean) }`}
                      value={reducer}
                      onChange={this.handleReducerChange}
                    />
                  </div>
                </Grid>
                <Grid item={true} xs={12} md={6}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className={classes.inputsText}
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
                  <div className={classes.buttonWrapper}>
                    {!isNew && <DelayButton
                      className={classes.deleteButton}
                      onClick={this.handleDelete}
                      triggeredLabel="Confirm"
                      color="secondary"
                    >
                      Delete
                    </DelayButton>}
                    <Button
                      type="button"
                      onClick={this.handleCancel}
                      color="primary"
                    >
                      Back
                    </Button>
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

  private handleCancel = () => {
    const { history } = this.props;
    history.push("/algorithms");
  };

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
    name: "title" | "description" | "inputs",
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

  private handleFileRead = (name: "dispatcher" | "runner" | "reducer") => (
    file: IFilePointer | null,
  ) => {
    const { error, clearError } = this.props;
    const { algorithm } = this.state;
    this.setState({
      algorithm: {
        ...algorithm,
        [name]: file,
      },
    } as any);
    if (error) {
      clearError();
    }
  };

  private handleDispatcherChange = this.handleFileRead("dispatcher");
  private handleRunnerChange = this.handleFileRead("runner");
  private handleReducerChange = this.handleFileRead("reducer");

  private handleDelete = () => {
    const { requestDeleteAlgorithm, match } = this.props;
    const { params } = match;
    if (params.id) {
      requestDeleteAlgorithm(params.id);
    }
  }
}

export default withStyles(algorithmEditStyles)(AlgorithmEdit);
