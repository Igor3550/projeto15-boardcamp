import express from 'express';
import { createRental, getRentals, returnRental, deleteRental } from '../controllers/rentalsController.js';
import { createRentalMiddleware, finishRentalMiddleware } from '../middlewares/rentalMiddleware.js';

const router = express.Router();

router.get('/rentals', getRentals)
router.post('/rentals', createRentalMiddleware, createRental)
router.post('/rentals/:id/return', finishRentalMiddleware, returnRental)
router.delete('/rentals/:id', deleteRental)

export default router;