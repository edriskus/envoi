import * as express from 'express';

import { doLogin, doRegister, doActivate } from '../controllers/auth';
import { failableController } from '../helpers/controller';

const router = express.Router();

/* POST login */
router.post('/login', failableController(doLogin));

/* POST register */
router.post('/register', failableController(doRegister));

/* GET activate */
router.get('/activate/:token', failableController(doActivate));


export default router;
