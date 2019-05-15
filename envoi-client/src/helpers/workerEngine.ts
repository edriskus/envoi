import axios from "axios";

import { Engine } from "./engine";
import { IBlock } from "../types/runner";
import {
  IPushCodeMessage,
  IPushBlockMessage,
  IWorkerMessage,
} from "../types/workerEngine";

const pushCodeMessage = (code: string): IPushCodeMessage => ({
  type: "PUSH_CODE",
  data: code,
});

const pushBlockMessage = (inputs: any): IPushBlockMessage => ({
  type: "PUSH_BLOCK",
  data: inputs,
});

export class WorkerEngine extends Engine {
  private worker?: Worker;
  private queuedExecutionResolver?: (results: any) => void;

  setup(jobId: string) {
    return axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/run/${jobId}`,
      responseType: "text",
    }).then(response => {
      this.worker = new Worker("/runner-worker.js");
      this.worker.postMessage(pushCodeMessage(response.data));
      this.worker.onmessage = this.handleWorkerMessage;
    });
  }

  stopCurrentBlock() {
    // TODO
  }

  executeBlock(block: IBlock) {
    return new Promise<any>((resolve, reject) => {
      this.block = block;
      if (this.worker) {
        this.worker.postMessage(pushBlockMessage(block.inputs));
      }
      this.queuedExecutionResolver = resolve;
    });
  }

  handleWorkerMessage = (message: { data: IWorkerMessage }) => {
    const payload = message.data;
    switch (payload.type) {
      case "PUSH_BLOCK":
        if (this.queuedExecutionResolver) {
          this.queuedExecutionResolver(payload.data);
        }
        break;
      case "PUSH_PROGRESS":
        this.triggerProgressListeners(payload.data);
        break;
      default:
        break;
    }
  };
}
