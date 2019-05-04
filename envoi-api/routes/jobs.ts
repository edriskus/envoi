import * as express from "express";

import {
  getJob,
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobs";
import { loggedIn } from "../helpers/auth";
import { failableController } from "../helpers/controller";

const router = express.Router();

/* GET job by ID */
router.get("/:id", failableController(getJob));

router.use(loggedIn());

/* GET jobs */
router.get("/", failableController(getJobs));

/* POST job */
router.post("/", failableController(createJob));

/* PATCH job */
router.patch("/:id", failableController(updateJob));

/* DELETE job */
router.delete("/:id", failableController(deleteJob));

export default router;
