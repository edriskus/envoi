import * as express from 'express';

import { doLogin, doRegister } from '../controllers/auth';
import { failableController } from '../helpers/controller';

const router = express.Router();

/* POST login */
router.post('/login', failableController(doLogin));

/* POST register */
router.post('/register', failableController(doRegister));

export default router;
