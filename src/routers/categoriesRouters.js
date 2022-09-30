import express from "express";
import { createCategory, getCategories } from "../controllers/categoriesControllers.js";
import { categoriesMiddleware } from "../middlewares/categoriesMiddleware.js";

const router = express.Router()

router.get('/categories', getCategories);
router.post('/categories', categoriesMiddleware, createCategory);

export default router;