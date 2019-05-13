import {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
  UnauthorizedError,
  AsyncRequestHandler
} from "../types/controller";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { IFilePointer } from "../types/algorithm";

export function throwNotFound(entityName: string): any {  
  throw new NotFoundError(entityName);
}

export function throwBadRequest(entityName: string): any {
  throw new BadRequestError(entityName);
}

export function throwUnauthorized(entityName: string): any {
  throw new UnauthorizedError(entityName);
}

export function throwForbidden(entityName: string): any {
  throw new ForbiddenError(entityName);
}

export function throwServerError(): any {
  throw null;
}

/**
 * Handles async function controller errors
 * @param controller
 */
export function failableController(
  controller: AsyncRequestHandler
): RequestHandler {
  return function(req?: Request, res?: Response, next?: NextFunction) {
    return controller(req, res, next).catch((error: any) => {
      console.error(error);
      if (
        error instanceof NotFoundError ||
        error instanceof BadRequestError ||
        error instanceof UnauthorizedError ||
        error instanceof ForbiddenError
      ) {
        return res.status(error.status).json(error);
      } else {
        return res.status(500).json({
          status: 500,
          message: "Unhandled error"
        });
      }
    });
  };
}

/**
 * Spreads file pointer for updating in mongoose
 * @param file 
 * @param name 
 */
export function spreadFilePointer(file: IFilePointer, name: string) {
  const value: any = {
    [`${name}.size`]: file.size,
    [`${name}.name`]: file.name,
  };
  if (file.content) {
    value[`${name}.content`] = file.content;
  }  
  return value;
}