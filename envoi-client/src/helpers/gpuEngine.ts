import { Engine } from "./engine";
import { IBlock } from "../types/runner";

export class GpuEngine extends Engine {
  setup(jobId: string) {
    // TODO
    return Promise.resolve();
  }

  stopCurrentBlock() {
    // TODO
  }

  executeBlock(block: IBlock) {
    return new Promise<IBlock>((resolve, reject) => {
      this.block = block;
      // TODO
      return resolve(block);
    });
  }
}
