import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAnalytics } from "../features/analyticsSlice";
import { updateBudget } from "../features/budgetSlice";
import CategoryPieChart from "../components/CategoryPieChart";
import DailyLineChart from "../components/DailyLineChart";

const Dashboard = () => {
    const dispatch = useDispatch();

    const { budget, spent, remaining, percent, loading } = useSelector(
        (state) => state.analytics,
    );

    const transactions = useSelector((state) => state.transactions.items);

    const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));

    const [budgetInput, setBudgetInput] = useState("");

    useEffect(() => {
        dispatch(fetchAnalytics(month));
    }, [dispatch, month, transactions]);

    const handleBudgetSave = async () => {
        const inputAmount = Number(budgetInput);

        if (!inputAmount || inputAmount <= 0) return;

        const newBudget = budget + inputAmount;

        await dispatch(
            updateBudget({
                month,
                amount: newBudget,
            }),
        );

        setBudgetInput("");

        dispatch(fetchAnalytics(month));
    };

    const getAlert = () => {
        if (budget === 0) return "No budget set for this month";

        if (percent >= 100) return "⚠️ Budget exceeded!";

        if (percent >= 80) return ` ️ You’ve used ${percent.toFixed(1)}% of your budget`

        return "All good 👍";
    };

    if (loading) {
        return <p className="text-white p-6">Loading...</p>;
    }

    return (
        <div className="p-6 text-white space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-sm text-gray-400">
                        Track your spending and stay on budget.
                    </p>
                </div>

                <input
                    type="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="bg-slate-800 p-2 rounded-lg border border-slate-700"
                />
            </div>

            <div
                className={`p-4 rounded-xl border ${
                    percent >= 100
                        ? "bg-red-500/10 border-red-500"
                        : percent >= 80
                          ? "bg-yellow-500/10 border-yellow-500"
                          : "bg-green-500/10 border-green-500"
                }`}
            >
                <p className="text-sm mb-2">
                    {getAlert()}{" "}
                    <span className="text-gray-400">
                        ₹{spent} / ₹{budget}
                    </span>
                </p>

                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                        className={`h-full ${
                            percent >= 100
                                ? "bg-red-500"
                                : percent >= 80
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                        }`}
                        style={{ width: `${Math.min(percent, 100)}%` }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-xl shadow">
                    <p className="text-sm text-gray-400">Budget</p>
                    <p className="text-xl font-semibold">₹{budget}</p>
                </div>

                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-xl shadow">
                    <p className="text-sm text-gray-400">Spent</p>
                    <p className="text-xl font-semibold">₹{spent}</p>
                </div>

                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-xl shadow">
                    <p className="text-sm text-gray-400">Remaining</p>
                    <p className="text-xl font-semibold">₹{remaining}</p>
                </div>

                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-xl shadow">
                    <p className="text-sm text-gray-400">Usage</p>
                    <p className="text-xl font-semibold">
                        {percent.toFixed(1)}%
                    </p>
                </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl flex justify-between items-center border border-slate-700">
                <div>
                    <h2 className="font-semibold">Add to Budget</h2>
                    <p className="text-sm text-gray-400">Current: ₹{budget}</p>
                </div>

                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="+ amount"
                        value={budgetInput}
                        onChange={(e) => setBudgetInput(e.target.value)}
                        className="bg-slate-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        onClick={handleBudgetSave}
                        className="bg-blue-500 px-4 rounded-lg hover:bg-blue-600 transition"
                    >
                        Add
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <CategoryPieChart />
                </div>

                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <DailyLineChart />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
