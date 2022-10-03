import express from 'express';
import { createRental, getRentals, returnRental } from '../controllers/rentalsController.js';
import { createRentalMiddleware, finishRentalMiddleware } from '../middlewares/rentalMiddleware.js';

const router = express.Router();

router.get('/rentals', getRentals)
router.post('/rentals', createRentalMiddleware, createRental)
router.post('/rentals/:id/return', finishRentalMiddleware, returnRental)

export default router;