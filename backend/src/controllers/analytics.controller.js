import mongoose from "mongoose";
import { monthRangeUtc } from "../utils/date.js";
import { Budget } from "../models/budget.model.js";
import { Transaction } from "../models/transaction.model.js";
import { Category } from "../models/category.model.js";

export const monthAnalytics = async (req, res) => {
    const userId = req.user.id;
    const { month } = req.query;
    if (!month || !/^\d{4}-\d{2}$/.test(month))
        return res
            .status(400)
            .json({ message: "month is required in (YYYY-MM) Format" });

    const { start, end } = monthRangeUtc(month);
    const userIdObject = new mongoose.Types.ObjectId(userId);

    const [ budget, totalsAgg, byCategoryAgg, dailyAgg, categories ] =
        await Promise.all([
            Budget.findOne({ userId, month }),
            Transaction.aggregate([
                {
                    $match: {
                        userId: userIdObject,
                        date: { $gte: start, $lt: end },
                    },
                },
                {
                    $group: {
                        _id: null,
                        spent: { $sum: "$amount" },
                        count: { $sum: 1 },
                    },
                },
            ]),
            Transaction.aggregate([
                {
                    $match: {
                        userId: userIdObject,
                        date: { $gte: start, $lt: end },
                    },
                },
                { $group: { _id: "$categoryId", total: { $sum: "$amount" } } },
                { $sort: { total: -1 } },
            ]),

            Transaction.aggregate([
                {
                    $match: {
                        userId: userIdObject,
                        date: { $gte: start, $lt: end },
                    },
                },
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$date",
                            },
                        },
                        total: { $sum: "$amount" },
                    },
                },
                { $sort: { _id: 1 } },
            ]),
            Category.find({ userId }).lean(),
        ]);

    const spent = totalsAgg[0]?.spent || 0;
    const budgetAmount = budget?.amount || 0;
    const remaining = Math.max(budgetAmount - spent, 0);
    const percent = budgetAmount > 0 ? (spent / budgetAmount) * 100 : 0;
    const alert =
        budgetAmount === 0
            ? "no_budget"
            : percent >= 100
              ? "exceeded"
              : percent >= 80
                ? "warning"
                : "ok";

    const catNameById = new Map(categories.map((c) => [String(c._id), c.name]));
    const byCategory = byCategoryAgg.map((cat) => ({
        categoryId: String(cat._id),
        categoryName: catNameById.get(String(cat._id)) || "Unknown",
        total: cat.total,
    }));

    const daily = dailyAgg.map((d) => ({ date: d._id, total: d.total }));

    res.json({
        month,
        budget: budgetAmount,
        spent,
        remaining,
        percent,
        alert,
        byCategory,
        daily,
    });
};
