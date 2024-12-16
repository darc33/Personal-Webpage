import express from 'express';
import { getGenreCounts, getLatestPosts } from '../controllers/booksController.js';

const router = express.Router();

router.get('/genres', getGenreCounts);
router.get('/posts', getLatestPosts)

export default router;