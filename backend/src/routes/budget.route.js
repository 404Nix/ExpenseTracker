import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { updateBudget } from "../controllers/budget.controller.js";

const router = Router();

router.get("/", requireAuth, updateBudget);
router.get("/summary", () => {}, () => {});

export default router;