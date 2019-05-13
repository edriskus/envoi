import * as express from "express";

import { getCode, getBlock, submitBlock } from "../controllers/runner";
import { failableController } from "../helpers/controller";

const router = express.Router();

/* GET code by Job ID */
router.get("/:id", failableController(getCode));
router.get("/:id/block", failableController(getBlock));
router.post("/:id/block/:blockId", failableController(submitBlock));

export default router;
