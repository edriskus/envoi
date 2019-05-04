import Algorithm from "../models/algorithm";

import {
  validateRequired,
  combineValidations,
  throwValidationError
} from "../helpers/validations";
import { Response, Request } from "express";
import { throwNotFound } from "../helpers/controller";

/**
 * Get Algorithm by id
 * @param req
 * @param res
 */
export async function getAlgorithm(req: Request, res: Response) {
  const { id } = req.params;
  const algorithm = await Algorithm.findOne(
    {
      _id: id
    },
    "-owner"
  ).catch(() => throwNotFound("Algorithm"));
  if (algorithm) {
    res.json(algorithm);
  } else {
    throwNotFound("Algorithm");
  }
}

/**
 * Get array of algorithms
 * @param req
 * @param res
 */
export async function getAlgorithms(req: Request, res: Response) {
  const algorithms = await Algorithm.find().catch(() =>
    throwNotFound("Algorithms")
  );
  res.json(algorithms);
}

/**
 * Create a algorithm
 * @param req
 * @param res
 */
export async function createAlgorithm(req: Request, res: Response) {
  const { _id } = req.user;
  const { title } = req.body;

  const errors = combineValidations(validateRequired(title, "Title"));
  if (errors) {
    throwValidationError(errors);
  }

  const algorithm = await Algorithm.create({
    owner: _id,
    title
  });
  res.status(201).json(algorithm);
}

/**
 * Update selected fields of a Algorithm
 * @param req
 * @param res
 */
export async function updateAlgorithm(req: Request, res: Response) {
  const { _id } = req.user;
  const { id } = req.params;
  const { title } = req.body;

  const errors = combineValidations(validateRequired(title, "Title"));
  if (errors) {
    throwValidationError(errors);
  }

  const algorithm = await Algorithm.findOneAndUpdate(
    {
      _id: id,
      owner: _id
    },
    {
      $set: {
        title
      }
    },
    {
      new: true
    }
  ).catch(() => throwNotFound("Algorithm"));
  res.json(algorithm);
}

/**
 * Delete Algorithm by id
 * @param req
 * @param res
 */
export async function deleteAlgorithm(req: Request, res: Response) {
  const { _id } = req.user;
  const { id } = req.params;

  const result = await Algorithm.deleteOne({
    _id: id,
    owner: _id
  }).catch(() => throwNotFound("Algorithm"));
  if (result && result.n > 0) {
    res.json(result);
  } else {
    throwNotFound("Algorithm");
  }
}
