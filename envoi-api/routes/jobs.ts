import * as express from 'express';
import { getJobs, createJob, updateJob, deleteJob } from '../controllers/jobs';

const router = express.Router();

/* GET jobs */
router.get('/', getJobs);

/* POST job */
router.post('/', createJob);

/* PATCH job */
router.patch('/', updateJob);

/* DELETE job */
router.delete('/', deleteJob);

export default router;
