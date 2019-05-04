import * as express from "express";

import { loggedIn } from "../helpers/auth";
import { getJobs, createJob, updateJob, deleteJob } from "../controllers/jobs";

const router = express.Router();


/* GET jobs */
router.get("/", getJobs);

router.use(loggedIn());

/* POST job */
router.post("/", createJob);

/* PATCH job */
router.patch("/", updateJob);

/* DELETE job */
router.delete("/", deleteJob);

export default router;
