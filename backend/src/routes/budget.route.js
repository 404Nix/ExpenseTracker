import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { getBudgetSummary, updateInserBudget } from "../controllers/budget.controller.js";

const router = Router();

router.put("/", requireAuth, updateInserBudget);
router.get("/summary", requireAuth, getBudgetSummary);

export default router;