import axios from "axios";

import { GPU } from "gpu.js";
import { Engine } from "./engine";
import { IBlock } from "../types/runner";

export class GpuEngine extends Engine {
  private exec?: any;
  private gpu?: GPU;

  setup(jobId: string) {
    return axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/run/${jobId}`,
      responseType: "text",
    }).then(response => {
      this.gpu = new GPU();
      this.exec = new Function(
        "inputs",
        "updateProgress",
        "gpu",
        response.data,
      );
    });
  }

  stopCurrentBlock() {
    // TODO
  }

  executeBlock(block: IBlock) {
    return new Promise<any>((resolve, reject) => {
      this.block = block;
      if (typeof this.exec === "function") {
        const result = this.exec(
          block.inputs,
          this.triggerProgressListeners,
          this.gpu,
        );
        resolve(result);
      } else {
        reject();
      }
    });
  }
}
