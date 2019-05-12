import React from "react";
import jobCreateStyles from "./JobCreate.tss";
import CreateFinish from "../../components/CreateFinish/CreateFinish";
import JobConfigurator from "../../components/JobConfigurator/JobConfigurator";
import AlgorithmChooser from "../../components/AlgorithmChooser/AlgorithmChooser";

import {
  Grid,
  Card,
  Step,
  Button,
  Stepper,
  StepLabel,
  withStyles,
  WithStyles,
  CardContent,
  StepContent,
  LinearProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { IJobRequest, IJob } from "../../types/job";
import { IApiError } from "../../types/api";
import { IAlgorithmSummary } from "../../types/algorithm";

export interface IJobCreateStateProps {
  job?: IJob;
  loading: boolean;
  error?: IApiError;
  algorithmsLoading: boolean;
  algorithmList?: IAlgorithmSummary[];
}

export interface IJobCreateDispatchProps {
  clearError(): void;
  requestListAlgorithm(): void;
  requestCreateJob(job: Partial<IJobRequest>): void;
}

export interface IJobCreateState {
  activeStep: number;
  submitted: boolean;
  job: Partial<IJobRequest>;
}

type IJobCreateStyleProps = WithStyles<typeof jobCreateStyles>;

export type IJobCreateProps = IJobCreateStateProps &
  IJobCreateDispatchProps &
  IJobCreateStyleProps;

class JobCreate extends React.PureComponent<IJobCreateProps, IJobCreateState> {
  state: IJobCreateState = {
    activeStep: 0,
    submitted: false,
    job: {},
  };

  componentDidMount() {
    const { requestListAlgorithm } = this.props;
    requestListAlgorithm();
  }

  componentDidUpdate(prevProps: IJobCreateProps) {
    const { loading, job } = this.props;
    const { submitted } = this.state;    
    if (prevProps.loading && !loading) {
      if (job && job._id && submitted) {
        this.setState({
          activeStep: 2,
          job,
        });
      }
    }
  }

  render() {
    const {
      error,
      classes,
      loading,
      clearError,
      algorithmList,
      algorithmsLoading,
    } = this.props;
    const { activeStep, job } = this.state;
    const { algorithmId } = job;
    return (
      <>
        <Grid item={true} xs={12}>
          <Card>
            {algorithmsLoading && <LinearProgress />}
            <CardContent>
              <Stepper
                orientation="vertical"
                activeStep={activeStep}
                className={classes.stepper}
              >
                <Step key={0}>
                  <StepLabel>Algorithm</StepLabel>
                  <StepContent>
                    <AlgorithmChooser
                      value={algorithmId}
                      list={algorithmList}
                      onChange={this.handleAlgorithmChange}
                    />
                    <div className={classes.buttonRightWrapper}>
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={this.handleSelectAlgorithm}
                        disabled={!this.firstValid()}
                      >
                        Next
                      </Button>
                    </div>
                  </StepContent>
                </Step>
                <Step key={1}>
                  <StepLabel>Configuration</StepLabel>
                  <StepContent>
                    <JobConfigurator
                      job={job}
                      error={error}
                      clearError={clearError}
                      onUpdate={this.handleJobUpdate}
                      algorithm={this.selectedAlgorithm()}
                    />
                    <div className={classes.buttonWrapper}>
                      <Button onClick={this.handlePrevious}>Previous</Button>
                      <Button
                        color="secondary"
                        disabled={loading}
                        variant="contained"
                        onClick={this.handleSubmit}
                      >
                        Next
                      </Button>
                    </div>
                  </StepContent>
                </Step>
                <Step key={2}>
                  <StepLabel>Finish</StepLabel>
                  <StepContent>
                    <CreateFinish />
                    <div className={classes.buttonRightWrapper}>
                      {job._id && (
                        <Button color="secondary" variant="contained">
                          <Link to={`/jobs/${job._id}`}>Open job</Link>
                        </Button>
                      )}
                    </div>
                  </StepContent>
                </Step>
              </Stepper>
            </CardContent>
            {loading && <LinearProgress />}
          </Card>
        </Grid>
      </>
    );
  }

  private firstValid = () => {
    const { job } = this.state;
    const { algorithmId } = job;
    return algorithmId != null && algorithmId.length > 0;
  };

  private selectedAlgorithm = () => {
    const { algorithmList } = this.props;
    const { job } = this.state;
    const { algorithmId } = job;
    if (algorithmId && Array.isArray(algorithmList)) {
      return algorithmList.find(algorithm => algorithm._id === algorithmId);
    } else {
      return undefined;
    }
  };

  private handleJobUpdate = (job: Partial<IJobRequest>) => {
    this.setState({
      job,
    });
  };

  private handleAlgorithmChange = (algorithmId: string) => {
    const { job } = this.state;
    this.setState({
      job: {
        ...job,
        algorithmId,
      },
    });
  };

  private handleSelectAlgorithm = () => {
    if (this.firstValid()) {
      this.setState({
        activeStep: 1,
      });
    }
  };

  private handleSubmit = () => {
    const { requestCreateJob } = this.props;
    const { job } = this.state;
    requestCreateJob(job);
    this.setState({
      submitted: true,
    });
  };

  private handlePrevious = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };
}

export default withStyles(jobCreateStyles)(JobCreate);
