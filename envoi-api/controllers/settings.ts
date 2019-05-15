import Credit from "../models/credit";

import { Response, Request } from "express";
import { throwNotFound } from "../helpers/controller";

/**
 *
 * @param req
 * @param res
 */
export function getSettings(req: Request, res: Response) {
  // TODO: Do something
  res.json({});
}

/**
 *
 * @param req
 * @param res
 */
export function updateSettings(req: Request, res: Response) {
  // TODO: Do something
  res.json({});
}

/**
 * 
 * @param req 
 * @param res 
 */
export async function getCredits(req: Request, res: Response) {
  const { _id } = req.user;
  const credits = await Credit.find({ owner: _id }).catch(() =>
    throwNotFound("Credits")
  );
  const sum = credits
    .filter((c: any) => !isNaN(c.value) && c.value > 0)
    .reduce((a: number, c: any) => a + c.value, 0);
  res.json({
    status: 200,
    value: sum
  });
}