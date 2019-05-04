import { BadRequestError } from "../types/controller";

/**
 *
 * @param value
 */
export function validateRequired(
  value: string | number,
  entityName: string = "Password"
): string | undefined {
  if ((typeof value === "string" && value.length < 1) || value == null) {
    return `${entityName} is required`;
  }
  return undefined;
}

/**
 *
 * @param value
 */
export function validateEmail(
  value: string,
  entityName: string = "Email"
): string | undefined {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regex.test(value)) {
    return `${entityName} is not a valid value`;
  }
  return undefined;
}

/**
 *
 * @param value
 */
export function validatePassword(
  value: string,
  entityName: string = "Password"
): string | undefined {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  if (!regex.test(value)) {
    return (
      entityName +
      " must contain at least 1 lowercase, 1 uppercase character, " +
      "1 numeric character, at least one special character and " +
      "be 8 characters or longer"
    );
  }
  return undefined;
}

/**
 *
 * @param value
 */
export function validateTrue(
  value: boolean,
  entityName: string
): string | undefined {
  if (value === true) {
    return `${entityName} must be selected`;
  }
  return undefined;
}

/**
 *
 * @param validateErrors
 */
export function combineValidations(
  ...validateErrors: (string | undefined)[]
): string[] | undefined {
  const validations = validateErrors.filter(e => e !== undefined);
  if (Array.isArray(validations) && validations.length > 0) {
    return validations;
  } else {
    return undefined;
  }
}

export function throwValidationError(errors: string[]) {
  const error = new BadRequestError("Request");
  error.message = "Some fields are not valid";
  error.errors = errors;
  throw error;
}
