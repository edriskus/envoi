import { Engine } from "./engine";
import { IBlock } from "../types/runner";

export class WorkerEngine extends Engine {
  setup() {
    // TODO
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