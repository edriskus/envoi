import { IValidationError, IApiError } from "../types/api";

/**
 *
 * @param name
 * @param errors
 */
export function hasError(name: string, error?: IApiError): boolean {
  if (!error || !Array.isArray(error.errors)) {
    return false;
  }
  return !!error.errors.find(e => e.name === name);
}

/**
 *
 * @param name
 * @param errors
 */
export function formatError(name: string, error?: IApiError): string | null {
  if (!error || !Array.isArray(error.errors)) {
    return null;
  }
  const errorMessages = error.errors
    .filter(e => e.name === name)
    .map(e => e.message)
    .join(" ");
  if (errorMessages.length < 1) {
    return null;
  } else {
    return errorMessages;
  }
}
