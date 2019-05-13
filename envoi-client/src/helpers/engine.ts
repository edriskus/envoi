import { IBlock } from "../types/runner";

export type EngineProgressListener = (progress: number) => void;

export abstract class Engine {

  block?: IBlock;
  protected progressListeners: EngineProgressListener[] = [];

  abstract stopCurrentBlock(): void;
  abstract setup(jobId: string): Promise<void>;
  abstract executeBlock(block: IBlock): Promise<any>;
  
  registerProgressListener(fn: EngineProgressListener) {
    if (typeof fn === "function") {
      this.progressListeners.push(fn);
    }
  }

  protected triggerProgressListeners(progress: number) {
    for (const fn of this.progressListeners) {
      fn(progress);
    }
  }
}