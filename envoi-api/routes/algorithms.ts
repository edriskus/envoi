import * as express from 'express';
import { getAlgorithms, createAlgorithm, updateAlgorithm, deleteAlgorithm } from '../controllers/algorithms';

const router = express.Router();

/* GET algorithms */
router.get('/', getAlgorithms);

/* POST algorithm */
router.post('/', createAlgorithm);

/* PATCH algorithm */
router.patch('/', updateAlgorithm);

/* DELETE algorithm */
router.delete('/', deleteAlgorithm);

export default router;
