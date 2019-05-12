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
import { IJobRequest } from "../../types/job";
import { IApiError } from "../../types/api";
import { IAlgorithmSummary } from "../../types/algorithm";

export interface IJobCreateStateProps {
  loading: boolean;
  error?: IApiError;
  algorithmsLoading: boolean;
  algorithmList?: IAlgorithmSummary[];
}

export interface IJobCreateDispatchProps {
  requestListAlgorithm(): void;
}

export interface IJobCreateState {
  activeStep: number;
  job: Partial<IJobRequest>;
}

type IJobCreateStyleProps = WithStyles<typeof jobCreateStyles>;

export type IJobCreateProps = 
  IJobCreateStateProps &
  IJobCreateDispatchProps &
  IJobCreateStyleProps;

class JobCreate extends React.PureComponent<IJobCreateProps, IJobCreateState> {
  state: IJobCreateState = {
    activeStep: 0,
    job: {},
  };

  componentDidMount() {
    const { requestListAlgorithm } = this.props;
    requestListAlgorithm();
  }

  render() {
    const { classes, algorithmsLoading, algorithmList } = this.props;
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
                        onClick={this.handleNext}
                        disabled={!this.firstValid()}
                      >Next</Button>
                    </div>
                  </StepContent>
                </Step>
                <Step key={1}>
                  <StepLabel>Configuration</StepLabel>
                  <StepContent>
                    <JobConfigurator />
                    <div className={classes.buttonWrapper}>
                      <Button
                        onClick={this.handlePrevious}
                      >Previous</Button>
                      <Button 
                        color="secondary"
                        variant="contained"
                        onClick={this.handleNext}
                      >Next</Button>
                    </div>
                  </StepContent>
                </Step>
                <Step key={2}>
                  <StepLabel>Finish</StepLabel>
                  <StepContent>
                    <CreateFinish />
                    <div className={classes.buttonRightWrapper}>
                      {job._id && <Button 
                        color="secondary"
                        variant="contained"
                      >
                        <Link to={`/jobs/${job._id}`}>
                          Open job
                        </Link>
                      </Button>}
                    </div>
                  </StepContent>
                </Step>
              </Stepper>
            </CardContent>
          </Card>
        </Grid>
      </>
    );
  }

  private firstValid = () => {
    const { job } = this.state;
    const { algorithmId } = job;
    return algorithmId != null && algorithmId.length > 0;
  }

  private handleAlgorithmChange = (algorithmId: string) => {
    const { job } = this.state;
    this.setState({
      job: {
        ...job,
        algorithmId,
      },
    });
  }

  private handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
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
