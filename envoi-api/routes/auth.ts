import * as express from 'express';

const router = express.Router();

/* GET */
router.get('/', function(req, res, next) {
  res.json({ message: 'OK' });
});

export default router;
