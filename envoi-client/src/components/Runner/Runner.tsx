import React from "react";

import { PlayArrow, Pause, Stop } from "@material-ui/icons";
import { Typography, LinearProgress, IconButton, withStyles, WithStyles } from "@material-ui/core";
import runnerStyles from "./Runner.tss";

type IRunnerProps = WithStyles<typeof runnerStyles>;

const Runner: React.FunctionComponent<IRunnerProps> = 
  (props: IRunnerProps) => {
    const { classes } = props;
    return (
        <>
        <Typography variant="body1">
          <b>Helpers: </b>
          3 active, 24 idle
        </Typography>
        <Typography variant="body1">
          <b>Status: </b>
          Idle
        </Typography>
        <div className={classes.progressWrapper}>
          <LinearProgress 
            variant="determinate"
            color="secondary" 
            value={23}
          />
        </div>
        <div className={classes.controlsWrapper}>
          <IconButton>
            <PlayArrow />
          </IconButton>
          <IconButton disabled={true}>
            <Pause />
          </IconButton>
          <IconButton disabled={true}>
            <Stop />
          </IconButton>
        </div>
      </>
    );
  };

export default withStyles(runnerStyles)(Runner);