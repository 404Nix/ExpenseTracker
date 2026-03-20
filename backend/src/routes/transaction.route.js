import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { listTransactions } from "../controllers/transaction.controller.js";

const router = Router();

router.get('/', requireAuth, listTransactions);
router.post('/', requireAuth, () => {});
router.delete('/:id', requireAuth, () => {});

export default router;