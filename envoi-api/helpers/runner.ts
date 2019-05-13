import { throwServerError } from "./controller";

/**
 * 
 * @param code 
 * @param blockNumber 
 */
export function runDispatcher(code: string, blockNumber: number, inputs: any) {
  try {
    return (new Function("index", "inputs", code))(blockNumber, JSON.parse(inputs));
  } catch (e) {
    console.error(e);
    throwServerError();
  }
}