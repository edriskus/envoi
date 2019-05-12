export interface IAlgorithm {
  title: string;
  description: string;
  inputs: string;
  gpu: boolean;
  dispatcher: IFilePointer;
  runner: IFilePointer;
  reducer: IFilePointer;
}

export interface IFilePointer {
  name: string;
  size: number;
  content: string;
}