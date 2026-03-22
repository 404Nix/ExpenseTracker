import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

const DailyLineChart = () => {
    const { daily } = useSelector((state) => state.analytics);

    return (
        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl shadow-md">
            <div className="mb-3 text-sm font-semibold text-zinc-900 dark:text-white">
                Daily trend
            </div>

            {daily.length === 0 ? (
                <div className="text-sm text-zinc-500 dark:text-gray-400">
                    No expenses yet for this month.
                </div>
            ) : (
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={daily}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#d4d4d8"
                            />
                            <XAxis
                                dataKey="date"
                                tick={{ fill: "#71717a", fontSize: 12 }}
                            />
                            <YAxis tick={{ fill: "#71717a", fontSize: 12 }} />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="total"
                                stroke="#38bdf8"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default DailyLineChart;
