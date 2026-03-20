import Router from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { monthAnalytics } from "../controllers/analytics.controller.js";

const router = Router();

router.get("/", requireAuth, monthAnalytics);

export default router;
