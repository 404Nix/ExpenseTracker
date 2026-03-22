import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";

const COLORS = ["#38bdf8", "#22c55e", "#f59e0b", "#ef4444"];

const CategoryPieChart = () => {
    const { byCategory } = useSelector((state) => state.analytics);

    return (
        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl shadow-md">
            <div className="mb-3 text-sm font-semibold text-zinc-900 dark:text-white">
                Spending by category
            </div>

            {byCategory.length === 0 ? (
                <div className="text-sm text-zinc-500 dark:text-gray-400">
                    No expenses yet for this month.
                </div>
            ) : (
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={byCategory}
                                dataKey="total"
                                nameKey="categoryName"
                                innerRadius={60}
                                outerRadius={90}
                            >
                                {byCategory.map((_, idx) => (
                                    <Cell
                                        key={idx}
                                        fill={COLORS[idx % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}

            <div className="mt-4 space-y-1">
                {byCategory.slice(0, 6).map((c) => (
                    <div
                        key={c.categoryId}
                        className="flex justify-between text-sm"
                    >
                        <span className="text-zinc-500 dark:text-gray-300">
                            {c.categoryName}
                        </span>
                        <span className="text-zinc-900 dark:text-white font-medium">
                            ₹{c.total}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryPieChart;
