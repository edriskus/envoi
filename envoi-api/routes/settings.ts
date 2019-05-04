import * as express from 'express';
import { updateSettings, getSettings } from '../controllers/settings';

const router = express.Router();

/* GET settings */
router.get('/', function(req, res) {
  getSettings(req, res);
});

/* PATCH settings */
router.patch('/', function(req, res) {
  updateSettings(req, res);
});

export default router;
