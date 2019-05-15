export interface IWorkerMessage {
  type: string;
  data: any;
}

export interface IPushCodeMessage extends IWorkerMessage {
  type: "PUSH_CODE";
  data: string;
}

export interface IPushBlockMessage extends IWorkerMessage {
  type: "PUSH_BLOCK";
  data: any;
}
