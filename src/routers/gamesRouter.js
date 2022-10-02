import express from 'express';
import { getGames, createGame } from '../controllers/gamesController.js';
import { gamesMiddleware } from '../middlewares/gamesMiddleware.js';

const router = express.Router();

router.get('/games', getGames);
router.post('/games', gamesMiddleware, createGame)

export default router;