import React from "react";
import runnerStyles from "./Runner.tss";

import {
  Typography,
  IconButton,
  withStyles,
  WithStyles,
  LinearProgress,
} from "@material-ui/core";
import { IBlock } from "../../types/runner";
import { apiFetch } from "../../helpers/api";
import { Engine } from "../../helpers/engine";
import { GpuEngine } from "../../helpers/gpuEngine";
import { PlayArrow, Pause } from "@material-ui/icons";
import { WorkerEngine } from "../../helpers/workerEngine";
import { RunnerUndefinedError } from "../../helpers/runner";

export interface IRunnerOwnProps {
  gpu: boolean;
  jobId: string;
  finished: boolean;
  autoStart?: boolean;
  triggerUpdate?: () => void;
}

type IRunnerStyleProps = WithStyles<typeof runnerStyles>;

export type IRunnerProps = IRunnerOwnProps & IRunnerStyleProps;

export interface IRunnerState {
  blocks: IBlock[];
  ready: boolean;
  running: boolean;
  progress: number;
  fetching: boolean;
  activeBlockId?: string;
}

class Runner extends React.PureComponent<IRunnerProps, IRunnerState> {
  private runner?: Engine;

  state: IRunnerState = {
    blocks: [],
    ready: false,
    running: false,
    fetching: false,
    progress: 0,
  };

  componentDidMount() {
    this.buildRunner();
    const { autoStart } = this.props;
    if (autoStart) {
      setTimeout(() => this.start());
    }
  }

  render() {
    const { classes, finished } = this.props;
    if (finished) {
      return <Typography align="center">This job has finished</Typography>;
    }
    const { ready, running, progress, activeBlockId } = this.state;
    const startActive = !running;
    const pauseActive = running;
    const status = running ? `Running block #${activeBlockId}` : ready 
      ? "Ready" : "Idle";
    return (
      <>
        <Typography variant="body1">
          <b>Status: </b>
          {status}
        </Typography>
        <div className={classes.progressWrapper}>
          <LinearProgress variant="determinate" color="secondary" value={progress} />
        </div>
        <div className={classes.controlsWrapper}>
          {startActive && (
            <IconButton disabled={!ready} onClick={this.start}>
              <PlayArrow />
            </IconButton>
          )}
          {pauseActive && (
            <IconButton disabled={!ready} onClick={this.pause}>
              <Pause />
            </IconButton>
          )}
        </div>
      </>
    );
  }

  start = () => {    
    const { running, ready } = this.state;
    if (!running && ready) {
      const block = this.takeFirstBlock();
      if (block) {
        this.executeBlock(block);
      } else {
        this.fetchNextBlock(true);
      }
      this.setState({
        running: true,
      });
    }
  };

  pause = () => {
    // Todo
    this.setState({
      running: false,
    });
  };

  private buildRunner = () => {
    const { jobId, gpu } = this.props;
    if (gpu) {
      this.runner = new GpuEngine();
    } else {
      this.runner = new WorkerEngine();
    }
    this.runner.registerProgressListener(this.registerProgress);
    this.runner.setup(jobId).then(
      () => {
        this.setState({
          ready: true,
        });
      },
    );
  };

  private fetchNextBlock = async (executeImmediately?: boolean) => {  
    
    try {
      const { blocks } = this.state;
      console.log("Fetching a block, now have", blocks.length);
      const { jobId } = this.props;
      this.setState({ fetching: true });
      const block = (await apiFetch(`run/${jobId}/block`, null)).data;
      this.setState({ fetching: false });
      if (executeImmediately) {
        this.executeBlock(block);
      } else {
        this.setState({
          blocks: [...blocks, block],
        });
      }
    } catch (e) {
      console.warn("Block fetch failed", e);
      this.setState({
        running: false,
        ready: false,
      });
    }
  };

  private executeBlock = async (block: IBlock) => {    
    try {
      this.setState({
        running: true,
        activeBlockId: block._id,
        progress: 0,
      });
      if (!this.runner) {
        return new RunnerUndefinedError();
      }
      const result = await this.runner.executeBlock(block);
      return await this.submitBlock(block, result);
    } catch (e) {
      console.warn("Block execution failed", e);
      this.setState({
        running: false,
        ready: false,
      });
    }
  };

  private registerProgress = (progress: number) => {
    const { running, blocks, fetching } = this.state;
    this.setState({ progress });
    if (running && !fetching && blocks.length < 1 && progress >= 50) {
      this.fetchNextBlock();
    }
  };

  private submitBlock = async (block: IBlock, result: any) => {
    const { jobId, triggerUpdate } = this.props; 
    const { blocks } = this.state;
    const response = (await apiFetch(
      `run/${jobId}/block/${block._id}`, 
      null,
      "POST",
      result,
    )).data;
    if (typeof triggerUpdate === "function") {
      triggerUpdate();
    }
    const { running } = this.state;
    if (running) {
      if (blocks.length > 0) {
        this.executeBlock(this.takeFirstBlock());
      } else {
        this.fetchNextBlock(true);
      }
    }
    return response;
  };

  private takeFirstBlock = () => {
    const { blocks } = this.state;
    const block = blocks[0];
    this.setState({
      blocks: blocks.slice(1),
    });
    return block;
  }
}

export default withStyles(runnerStyles)(Runner);
