import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAnalytics } from "../features/analyticsSlice";

const Dashboard = () => {

    const dispatch = useDispatch();

    const { budget, spent, remaining, percent, loading } = useSelector(
        (state) => state.analytics,
    );

    useEffect(() => {
        const month = new Date().toISOString().slice(0, 7);
        dispatch(fetchAnalytics(month));
    }, [dispatch]);

    if (loading) return <p className="text-white">Loading...</p>;

    return (
        <div className="p-6 text-white">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            {/* Cards */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-slate-800 p-4 rounded-xl">
                    <p>Budget</p>
                    <h2 className="text-xl">₹{budget}</h2>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl">
                    <p>Spent</p>
                    <h2 className="text-xl">₹{spent}</h2>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl">
                    <p>Remaining</p>
                    <h2 className="text-xl">₹{remaining}</h2>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl">
                    <p>Usage</p>
                    <h2 className="text-xl">{percent.toFixed(1)}%</h2>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
