import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchTransactions,
    deleteTransaction,
} from "../features/transactionsSlice";

const TransactionsList = () => {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state) => state.transactions);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    if (loading) return <p className="text-gray-400">Loading...</p>;

    return (
        <div className="bg-slate-800 p-6 rounded-xl space-y-3">
            <h2 className="mb-4">Transactions</h2>
            {items.length === 0 ? (
                <p className="text-gray-400">No transactions to display.</p>
            ) : null}
            {items.map((t) => (
                <div
                    key={t.id}
                    className="flex justify-between items-center bg-slate-700 p-3 rounded"
                >
                    <div>
                        <p className="font-semibold">₹{t.amount}</p>
                        {t.note && (
                            <p className="text-sm text-gray-400">{t.note}</p>
                        )}
                    </div>

                    <div className="flex flex-col items-end">
                        <p className="text-xs text-gray-400">
                            {new Date(t.date).toLocaleDateString()}
                        </p>

                        <button
                            onClick={() => dispatch(deleteTransaction(t.id))}
                            className="text-red-400 text-xs mt-1 hover:text-red-600 cursor-pointer"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TransactionsList;
