import * as express from 'express';
import { getAlgorithms, createAlgorithm, updateAlgorithm, deleteAlgorithm } from '../controllers/algorithms';

const router = express.Router();

/* GET algorithms */
router.get('/', function(req, res) {
  getAlgorithms(req, res);
});

/* POST algorithm */
router.post('/', function(req, res) {
  createAlgorithm(req, res);
});

/* PATCH algorithm */
router.patch('/', function(req, res) {
  updateAlgorithm(req, res);
});

/* DELETE algorithm */
router.delete('/', function(req, res) {
  deleteAlgorithm(req, res);
});

export default router;
