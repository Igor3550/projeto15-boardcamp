import express from 'express';
import { getGames } from '../controllers/gamesController.js';

const router = express.Router();

router.get('/games', getGames);

export default router;