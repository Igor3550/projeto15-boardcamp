import express from "express";
import { createCustomer, getCustomers, getCustomersById, updateCustomer } from "../controllers/customersController.js";
import { customerMiddleware, updateCustMiddleware } from "../middlewares/customersMiddleware.js";

const router = express.Router();

router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomersById);
router.post('/customers', customerMiddleware, createCustomer)
router.put('/customers/:id', updateCustMiddleware, updateCustomer)

export default router;