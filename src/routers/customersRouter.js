import express from "express";
import { createCustomer, getCustomers, getCustomersById } from "../controllers/customersController.js";
import { customerMiddleware } from "../middlewares/customersMiddleware.js";

const router = express.Router();

router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomersById);
router.post('/customers', customerMiddleware, createCustomer)

export default router;