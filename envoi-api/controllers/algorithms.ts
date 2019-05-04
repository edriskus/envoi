import { Response, Request } from "express";
import { deleteSuccess } from "../helpers/response";

/**
 *
 * @param req
 * @param res
 */
export function getAlgorithm(req: Request, res: Response) {
  // TODO: Do something
  res.json({});
}

/**
 *
 * @param req
 * @param res
 */
export function getAlgorithms(req: Request, res: Response) {
  // TODO: Do something
  res.json({});
}

/**
 *
 * @param req
 * @param res
 */
export function createAlgorithm(req: Request, res: Response) {
  // TODO: Do something
  res.status(201).json({});
}

/**
 *
 * @param req
 * @param res
 */
export function updateAlgorithm(req: Request, res: Response) {
  // TODO: Do something
  res.json({});
}

/**
 *
 * @param req
 * @param res
 */
export function deleteAlgorithm(req: Request, res: Response) {
  // TODO: Do something
  res.json(deleteSuccess({}));
}
