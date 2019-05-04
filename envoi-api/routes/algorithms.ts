import * as express from "express";

import {
  getAlgorithm,
  getAlgorithms,
  createAlgorithm,
  updateAlgorithm,
  deleteAlgorithm,
} from "../controllers/algorithms";
import { isCreator, loggedIn } from "../helpers/auth";

const router = express.Router();

router.use(loggedIn());

/* GET algorithms */
router.get("/", getAlgorithms);

/* GET algorithms */
router.get("/:id", getAlgorithm);

router.use(isCreator);

/* POST algorithm */
router.post("/", createAlgorithm);

/* PATCH algorithm */
router.patch("/:id", updateAlgorithm);

/* DELETE algorithm */
router.delete("/:id", deleteAlgorithm);

export default router;
