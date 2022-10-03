import express from 'express';
import { createRental, getRentals } from '../controllers/rentalsController.js';
import { createRentalMiddleware } from '../middlewares/rentalMiddleware.js';

const router = express.Router();

router.get('/rentals', getRentals)
router.post('/rentals', createRentalMiddleware, createRental)

export default router;