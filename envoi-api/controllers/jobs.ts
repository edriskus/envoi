import Job from "../models/job";

import {
  validateRequired,
  combineValidations,
  throwValidationError
} from "../helpers/validations";
import { Response, Request } from "express";
import { throwNotFound } from "../helpers/controller";

/**
 * Get Job by id
 * @param req
 * @param res
 */
export async function getJob(req: Request, res: Response) {
  const { id } = req.params;
  const job = await Job.findOne(
    {
      _id: id
    },
    "-owner"
  ).catch(() => throwNotFound("Job"));
  if (job) {
    res.json(job);
  } else {
    throwNotFound("Job");
  }
}

/**
 * Get array of own jobs
 * @param req
 * @param res
 */
export async function getJobs(req: Request, res: Response) {
  const { _id } = req.user;
  const jobs = await Job.find({ owner: _id }, "-owner").catch(() =>
    throwNotFound("Jobs")
  );
  res.json(jobs);
}

/**
 * Create a job
 * @param req
 * @param res
 */
export async function createJob(req: Request, res: Response) {
  const { _id } = req.user;
  const { title } = req.body;

  const errors = combineValidations(validateRequired(title, "title", "Title"));
  if (errors) {
    throwValidationError(errors);
  }

  const job = await Job.create({
    owner: _id,
    title
  });
  res.status(201).json(job);
}

/**
 * Update selected fields of a Job
 * @param req
 * @param res
 */
export async function updateJob(req: Request, res: Response) {
  const { _id } = req.user;
  const { id } = req.params;
  const { title } = req.body;

  const errors = combineValidations(validateRequired(title, "title", "Title"));
  if (errors) {
    throwValidationError(errors);
  }

  const job = await Job.findOneAndUpdate(
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
  ).catch(() => throwNotFound("Job"));
  res.json(job);
}

/**
 * Delete Job by id
 * @param req
 * @param res
 */
export async function deleteJob(req: Request, res: Response) {
  const { _id } = req.user;
  const { id } = req.params;

  const result = await Job.deleteOne({
    _id: id,
    owner: _id
  }).catch(() => throwNotFound("Job"));
  if (result && result.n > 0) {
    res.json(result);
  } else {
    throwNotFound("Job");
  }
}
