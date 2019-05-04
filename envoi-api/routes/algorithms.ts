import * as express from "express";

import {
  getAlgorithm,
  getAlgorithms,
  createAlgorithm,
  updateAlgorithm,
  deleteAlgorithm,
} from "../controllers/algorithms";
import { isCreator, loggedIn } from "../helpers/auth";
import { failableController } from "../helpers/controller";

const router = express.Router();

router.use(loggedIn());

/* GET algorithms */
router.get("/", failableController(getAlgorithms));

/* GET algorithms */
router.get("/:id", failableController(getAlgorithm));

router.use(isCreator);

/* POST algorithm */
router.post("/", failableController(createAlgorithm));

/* PATCH algorithm */
router.patch("/:id", failableController(updateAlgorithm));

/* DELETE algorithm */
router.delete("/:id", failableController(deleteAlgorithm));

export default router;
