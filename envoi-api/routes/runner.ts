import * as express from "express";

import { getCode, getBlock } from "../controllers/runner";
import { failableController } from "../helpers/controller";

const router = express.Router();

/* GET code by Job ID */
router.get("/:id", failableController(getCode));
router.get("/:id/block", failableController(getBlock));


export default router;
