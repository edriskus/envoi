import { IBlock } from "../types/runner";

export type EngineProgressListener = (progress: number) => void;

export abstract class Engine {

  block?: IBlock;
  protected progressListeners: EngineProgressListener[] = [];

  constructor (
    private codeUrl: string,
  ) { 
    this.setup();
  }

  abstract setup(): void;
  abstract stopCurrentBlock(): void;
  abstract executeBlock(block: IBlock): Promise<IBlock>;
  
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