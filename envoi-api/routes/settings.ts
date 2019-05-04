import * as express from 'express';

import { updateSettings, getSettings } from '../controllers/settings';

const router = express.Router();

/* GET settings */
router.get('/', getSettings);

/* PATCH settings */
router.patch('/', updateSettings);

export default router;
