import express from "express";
import { createCustomer, getCustomers, getCustomersById } from "../controllers/customersController.js";

const router = express.Router();

router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomersById);
router.post('/customers', createCustomer)

export default router;