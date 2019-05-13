import Job from "../models/job";
import Block from "../models/block";
import Algorithm from "../models/algorithm";

import { Response, Request } from "express";
import { throwNotFound, throwServerError } from "../helpers/controller";
import { runDispatcher, findSameResultIndex, isBlockValid } from "../helpers/runner";

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
    running: false,
    validated: false,
  }, "_id jobId algorithmId inputs")
    .catch(() => null);
  if (availableBlock) {
    res.json(availableBlock);
    availableBlock.running = true;
    availableBlock.save();
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
  const { id, blockId } = req.params;
  const result = req.body;
  const block = await Block.findOne({ _id: blockId, jobId: id })
    .catch(() => throwNotFound("Block"));
  if (block.validated || !block.running) {
    res.status(200).json({ status: 200, accepted: false })
  }
  const sameResultIndex = findSameResultIndex(result, block.results);
  if (sameResultIndex !== -1) {
    block.results[sameResultIndex].userIds.push(true);
    if (isBlockValid(block.results)) {
      block.validated = true;
    }
  } else {
    block.results.push({
      userIds: [true],
      data: result,
    });
  }
  block.running = false;
  await block.save();
  res.status(200).json({ status: 200, accepted: true });
}