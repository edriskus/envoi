export interface IAlgorithmRequest {
  _id: string;
  title: string;
  description: string;
  inputs: string;
  outputs: string;
  gpu: boolean;
}