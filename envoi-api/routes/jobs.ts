import * as express from 'express';
import { getJobs, createJob, updateJob, deleteJob } from '../controllers/jobs';

const router = express.Router();

/* GET jobs */
router.get('/', function(req, res) {
  getJobs(req, res);
});

/* POST job */
router.post('/', function(req, res) {
  createJob(req, res);
});

/* PATCH job */
router.patch('/', function(req, res) {
  updateJob(req, res);
});

/* DELETE job */
router.delete('/', function(req, res) {
  deleteJob(req, res);
});

export default router;
