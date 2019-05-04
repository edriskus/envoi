import { Request, Response, NextFunction } from "express";

export class NotFoundError {
  public status = 404;
  public message: string;

  constructor(
    entityName: string
  ) {
    this.message = `${entityName} not found!`;
  }
}

export class BadRequestError {
  public status = 400;
  public message: string;
  public errors?: string[];

  constructor(
    entityName: string
  ) {
    this.message = `Bad request for entity ${entityName}`;
  }
}

export class UnauthorizedError {
  public status = 401;
  public message: string;

  constructor(
    entityName: string = 'the data'
  ) {
    this.message = `Please log in to access ${entityName}`;
  }
}

export class ForbiddenError {
  public status = 403;
  public message: string;

  constructor(
    entityName: string
  ) {
    this.message = `Not authorized to access ${entityName}`;
  }
}

export type AsyncRequestHandler<T = any> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<T>;