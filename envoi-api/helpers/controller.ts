import { RequestHandler, Request, Response, NextFunction } from "express";
import {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
  UnauthorizedError,
  AsyncRequestHandler,
} from "../types/controller";

export function throwNotFound(entityName: string) {
  throw new NotFoundError(entityName);
}

export function throwBadRequest(entityName: string) {
  throw new BadRequestError(entityName);
}

export function throwUnauthorized(entityName: string) {
  throw new UnauthorizedError(entityName);
}

export function throwForbidden(entityName: string) {
  throw new ForbiddenError(entityName);
}

export function throwServerError() {
  throw null;
}

export function failableController(
  controller: AsyncRequestHandler
): RequestHandler {
  return function(req?: Request, res?: Response, next?: NextFunction) {
    console.log("Running failable controller inside");
    
    return controller(req, res, next).then(
      () => {
        console.log("All fuking good");
        
      },
      (error: any) => {
        console.log("Caught error");
        
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
            message: 'Unhandled error'
          });
        }
      }
    );
  };
}
