import Job from "../models/job";
import Block from "../models/block";
import Algorithm from "../models/algorithm";

import { Response, Request } from "express";
import { throwNotFound, throwServerError } from "../helpers/controller";
import { runDispatcher } from "../helpers/runner";

/**
 * 
 * @param req 
 * @param res 
 */
export async function getCode(req: Request, res: Response) {
  const { id } = req.params;
  const job = await Job.findOne(
    {
      _id: id
    },
    "algorithmId"
  ).catch(() => throwNotFound("Job"));
  const algorithm = await Algorithm.findOne(
    {
      _id: job.algorithmId
    },
    "runner"
  ).catch(() => throwNotFound("Algorithm"));  
  
  if (algorithm && algorithm.runner) {
    res.send(algorithm.runner.content);
  } else {
    throwNotFound("Code");
  }
}

/**
 * 
 * @param req 
 * @param res 
 */
export async function getBlock(req: Request, res: Response) {
  const { id } = req.params;
  const availableBlock = await Block.findOne({ 
    jobId: id, 
    running: false 
  }, "_id jobId algorithmId inputs");
  if (availableBlock) {
    res.json(availableBlock);
  } else {
    const {
      _id,
      jobId,
      algorithmId,
      inputs,
    } = await generateBlock(id);
    res.json({
      _id,
      jobId,
      algorithmId,
      inputs,
    });
  }
}

async function generateBlock(jobId: string) {
  const job = await Job.findById(jobId, "algorithmId")
    .catch(() => throwNotFound("Job"));
  const algorithm = await Algorithm.findById(job.algorithmId, "dispatcher inputs")
    .catch(() => throwNotFound("Algorithm"));
  const blockCount = await Block.count({ jobId });
  const inputs = runDispatcher(
    algorithm.dispatcher.content, 
    blockCount,
    algorithm.inputs,
  );
  if (!inputs) {
    throwNotFound("Block");
  } else {
    return Block.create({
      jobId,
      algorithmId: job.algorithmId,
      running: true,
      validated: false,
      inputs,
      results: []
    }).catch(() => throwServerError());
  }
}

/**
 * 
 * @param req 
 * @param res 
 */
export async function submitBlock(req: Request, res: Response) {

}