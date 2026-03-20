import mongoose from "mongoose";
import { Budget } from "../models/budget.model.js";
import { Transaction } from "../models/transaction.model.js";
import { monthRangeUtc } from "../utils/date.js";

export const updateInserBudget = async (req, res) => {
    const userId = req.user.id;
    const { month, amount } = req.body;

    const budget = await Budget.findOneAndUpdate(
        { userId, month: month },
        { $set: { amount: amount } },
        { upsert: true, new: true },
    ).lean();

    res.json({
        budget: {
            id: String(budget._id),
            month: budget.month,
            amount: budget.amount,
        },
    });
};

export const getBudgetSummary = async (req, res) => {
    const userId = req.user.id;
    const month = req.query.month;

    if (!month || !/^\d{4}-\d{2}$/.test(month))
        return res
            .status(400)
            .json({ message: "month is required in (YYYY-MM) Format" });

    const budget = await Budget.findOne({ userId, month }).lean();
    const budgetAmount = budget?.amount || 0;

    const { start, end } = monthRangeUtc(month);

    const agg = await Transaction.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId),
                date: { $gte: start, $lt: end },
            },
        },
        { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const spent = agg[0]?.total || 0;

    const remaining = Math.max(budgetAmount - spent, 0);
    const percent = budgetAmount > 0 ? (spent / budgetAmount) * 100 : 0;
    const status =
        budgetAmount === 0
            ? "no_budget"
            : percent >= 100
              ? "exceeded"
              : percent >= 80
                ? "warning"
                : "ok";

    res.json({
    month,
    budget: budgetAmount,
    spent,
    remaining,
    percent,
    alert: status
  });
};
