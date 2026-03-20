import mongoose from "mongoose";
import { Category } from "../models/category.model.js";
import { Transaction } from "../models/transaction.model.js";


function format(t) {
  return {
    id: String(t._id),
    amount: t.amount,
    categoryId: String(t.categoryId),
    date: t.date.toISOString(),
    note: t.note || ''
  };
}

export const listTransactions = async (req, res) => {
    const userId = req.user.id;
    const limit = Math.min(Number(req.query.limit || 100), 500);
    const page = Math.max(Number(req.query.page || 1), 1);
    const skip = (page - 1) * limit;

    const items = await Transaction.find(
        Transaction.find({ userId })
            .sort({ date: -1, createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
    );
    const total = await Transaction.countDocuments({ userId });

    res.status(200).json({
        transactions: items.map(format),
        page,
        limit,
        total,
    });
};

export const createTransactions = async (req, res) => {
  const userId = req.user.id;
  const { amount, categoryId, note, date } = req.body;

  const cat = await Category.findOne({ _id: categoryId, userId }).lean();
  if (!cat) {
    return res.status(400).json({ message: "Invalid category" });
  }

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return res.status(400).json({ message: "Invalid date" });
  }

  const newTrx = await Transaction.create({
    userId,
    categoryId: new mongoose.Types.ObjectId(categoryId),
    date: parsedDate,
    amount,
    note: note || "",
  });

  res.status(201).json({
    transaction: format(newTrx),
  });
};

export const deleteTransactions = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    const dltTrx = await Transaction.findOneAndDelete({ _id: id, userId });
    if (!dltTrx)
        return res.status(404).json({
            message: "Transaction not found",
        });
    res.status(200).json({ok: true});
};
