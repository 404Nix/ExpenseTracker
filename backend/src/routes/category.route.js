import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { createCategories, deleteCategories, listCategories } from "../controllers/category.controller.js";

const router = Router();

router.get('/', requireAuth, listCategories);
router.post('/', requireAuth, createCategories);
router.delete('/:id', requireAuth, deleteCategories);

export default router