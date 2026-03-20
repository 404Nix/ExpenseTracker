import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { createTransactions, deleteTransactions, listTransactions } from "../controllers/transaction.controller.js";

const router = Router();

router.get('/', requireAuth, listTransactions);
router.post('/', requireAuth, createTransactions);
router.delete('/:id', requireAuth, deleteTransactions);

export default router;