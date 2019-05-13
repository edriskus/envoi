import { throwServerError } from "./controller";
import { IBlockResult } from "../types/runner";

/**
 *
 * @param code
 * @param blockNumber
 */
export function runDispatcher(code: string, blockNumber: number, inputs: any) {
  try {
    return new Function("index", "inputs", code)(
      blockNumber,
      JSON.parse(inputs)
    );
  } catch (e) {
    console.log(inputs);
    
    console.error(e);
    throwServerError();
  }
}

/**
 *
 * @param code
 * @param blockNumber
 */
export function runReducer(
  code: string,
  accumulator: any,
  value: any,
  inputs: any,
) {
  try {
    return new Function("accumulator", "value", "inputs", "finish", code)(
      accumulator,
      value,
      inputs,
    );
  } catch (e) {
    console.error(e);
    throwServerError();
  }
}

/**
 *
 * @param data
 * @param results
 */
export function findSameResultIndex(data: any, results: IBlockResult[]) {
  if (!Array.isArray(results) || !data) {
    return -1;
  } else {
    return results.findIndex(
      r => JSON.stringify(r.data) === JSON.stringify(data)
    );
  }
}

/**
 * Check validations
 * @param results
 * @param minimumRuns
 * @param ratioThreshold
 */
export function isBlockValid(
  results: IBlockResult[],
  minimumRuns: number = 3,
  ratioThreshold: number = 0.5
) {
  const allValidations = results.reduce(
    (value, result) => value + result.userIds.length,
    0
  );
  if (allValidations < minimumRuns) {
    return { valid: false };
  }
  for (const result of results) {
    if (result.userIds.length / allValidations > ratioThreshold) {
      return {
        valid: true,
        resultData: result.data,
        userIds: result.userIds
      };
    }
  }
  return { valid: false };
}
