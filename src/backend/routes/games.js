import express from 'express';
import { getGames } from '../controllers/gamesController.js';
const router = express.Router();

router.get('/', getGames);

export default router;




