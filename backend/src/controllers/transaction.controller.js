import { Transaction } from "../models/transaction.model.js";

export const listTransactions = async (req, res) => {
    const userId = req.user.id;
    const limit = Math.min(Number(req.query.limit || 100), 500);
    const page = Math.max(Number(req.query.page || 1), 1);
    const skip = (page - 1) * limit;

    const items = await Transaction.find(
        Transaction.find({ userId }).sort({ date: -1, createdAt: -1 }).skip(skip).limit(limit).lean(),
    );
    const total = await Transaction.countDocuments({ userId });
    

    res.json({
    transactions: items,
    page,
    limit,
    total
  });
};

export const createTransactions = async () => {};

export const deleteTransactions = async () => {};
