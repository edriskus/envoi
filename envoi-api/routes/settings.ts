import * as express from 'express';

import { updateSettings, getSettings, getCredits } from '../controllers/settings';
import { failableController } from '../helpers/controller';
import { loggedIn } from '../helpers/auth';

const router = express.Router();

router.use(loggedIn());

/* GET credits */
router.get("/credits", failableController(getCredits));

/* GET settings */
router.get('/', getSettings);

/* PATCH settings */
router.patch('/', updateSettings);

export default router;
