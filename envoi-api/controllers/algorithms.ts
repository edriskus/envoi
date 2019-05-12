import Algorithm from "../models/algorithm";

import {
  validateRequired,
  combineValidations,
  throwValidationError,
  validateFilePointer
} from "../helpers/validations";
import { Response, Request } from "express";
import { throwNotFound, spreadFilePointer } from "../helpers/controller";

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
    "-owner -dispatcher.content -reducer.content -runner.content"
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
  const algorithms = await Algorithm.find(
    {},
    "-owner -dispatcher.content -reducer.content -runner.content"
  ).catch(() =>
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
  const { 
    title,
    description,
    inputs,
    gpu,
    dispatcher,
    runner,
    reducer,
  } = req.body;

  const errors = combineValidations(
    validateRequired(title, "title", "Title"),
    validateRequired(description, "description", "Description"),
    validateRequired(inputs, "inputs", "Inputs"),
    validateFilePointer(dispatcher, "dispatcher", "Dispatcher"),
    validateFilePointer(runner, "runner", "Runner"),
    validateFilePointer(reducer, "reducer", "Reducer"),
  );
  if (errors) {
    throwValidationError(errors);
  }

  const saveResult = await Algorithm.create({
    owner: _id,
    title,
    description,
    inputs,
    gpu,
    dispatcher,
    runner,
    reducer,
  });

  const algorithm = await Algorithm.findOne(
    {
      _id: saveResult._id
    },
    "-owner -dispatcher.content -reducer.content -runner.content"
  ).catch(() => throwNotFound("Algorithm"));
  if (algorithm) {
    res.status(201).json(algorithm);
  } else {
    throwNotFound("Algorithm");
  }
}

/**
 * Update selected fields of a Algorithm
 * @param req
 * @param res
 */
export async function updateAlgorithm(req: Request, res: Response) {
  const { _id } = req.user;
  const { id } = req.params;
  const { 
    title,
    description,
    inputs,
    gpu,
    dispatcher,
    runner,
    reducer,
  } = req.body;

  const errors = combineValidations(
    validateRequired(title, "title", "Title"),
    validateRequired(description, "description", "Description"),
    validateRequired(inputs, "inputs", "Inputs"),
    validateFilePointer(dispatcher, "dispatcher", "Dispatcher"),
    validateFilePointer(runner, "runner", "Runner"),
    validateFilePointer(reducer, "reducer", "Reducer"),
  );
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
        title,
        description,
        inputs,
        gpu,
        ...spreadFilePointer(dispatcher, "dispatcher"),
        ...spreadFilePointer(runner, "runner"),
        ...spreadFilePointer(reducer, "reducer"),
      }
    },
    {
      new: true,
      projection: "-owner -dispatcher.content -reducer.content -runner.content"
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
