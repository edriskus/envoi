import axios from "axios";

import { Engine } from "./engine";
import { IBlock } from "../types/runner";

export class WorkerEngine extends Engine {

  private exec?: (inputs: any) => any;
  
  setup(jobId: string) {
    return axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/run/${jobId}`,
      responseType: "text",
    }).then(
      response => {
        this.exec = new Function("inputs", response.data) as any;
      },
    );
  }

  stopCurrentBlock() {
    // TODO
  }

  executeBlock(block: IBlock) {
    return new Promise<any>((resolve, reject) => {
      this.block = block;
      const results = this.exec && this.exec(block.inputs);
      return resolve(results);
    });
  }
}