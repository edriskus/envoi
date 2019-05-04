import { Response, Request } from "express";
import { deleteSuccess } from "../helpers/response";

/**
 *
 * @param req
 * @param res
 */
export function getJob(req: Request, res: Response) {
  // TODO: Do something
  res.json({
    _id: req.params.id,
    title: "job1"
  });
}

/**
 *
 * @param req
 * @param res
 */
export function getJobs(req: Request, res: Response) {
  // TODO: Do something
  res.json([{ title: "job1" }]);
}

/**
 *
 * @param req
 * @param res
 */
export function createJob(req: Request, res: Response) {
  // TODO: Do something
  res.status(201).json({});
}

/**
 *
 * @param req
 * @param res
 */
export function updateJob(req: Request, res: Response) {
  // TODO: Do something
  res.json({});
}

/**
 *
 * @param req
 * @param res
 */
export function deleteJob(req: Request, res: Response) {
  // TODO: Do something
  res.json(deleteSuccess({}));
}
