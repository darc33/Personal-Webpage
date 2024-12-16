import express from 'express';
import { getGenreCounts } from '../controllers/booksController.js';

const router = express.Router();

router.get('/genres', getGenreCounts);

export default router;