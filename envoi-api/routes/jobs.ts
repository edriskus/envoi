import * as express from "express";

import {
  getJob,
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobs";
import { loggedIn } from "../helpers/auth";

const router = express.Router();

/* GET job by ID */
router.get("/:id", getJob);

router.use(loggedIn());

/* GET jobs */
router.get("/", getJobs);

/* POST job */
router.post("/", createJob);

/* PATCH job */
router.patch("/:id", updateJob);

/* DELETE job */
router.delete("/:id", deleteJob);

export default router;
