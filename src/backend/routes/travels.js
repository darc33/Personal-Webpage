import express from 'express';
import { getTravels } from '../controllers/travelsController.js';

const router = express.Router();

router.get('/', getTravels);

export default router;