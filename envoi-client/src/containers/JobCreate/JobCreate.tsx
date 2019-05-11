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
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { IJobRequest } from "../../types/job";

export interface IJobCreateState {
  activeStep: number;
  job: Partial<IJobRequest>;
}

type IJobCreateProps = WithStyles<typeof jobCreateStyles>;

class JobCreate extends React.PureComponent<IJobCreateProps, IJobCreateState> {
  state: IJobCreateState = {
    activeStep: 0,
    job: {},
  };

  render() {
    const { classes } = this.props;
    const { activeStep, job } = this.state;
    return (
      <>
        <Grid item={true} xs={12}>
          <Card>
            <CardContent>
              <Stepper 
                orientation="vertical"
                activeStep={activeStep} 
                className={classes.stepper}
              >
                <Step key={0}>
                  <StepLabel>Algorithm</StepLabel>
                  <StepContent>
                    <AlgorithmChooser />
                    <div className={classes.buttonRightWrapper}>
                      <Button 
                        color="secondary"
                        variant="contained"
                        onClick={this.handleNext}
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

  private handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
      job: { _id: "1ab" },
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
