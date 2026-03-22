import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../features/transactionsSlice";

const TransactionForm = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.items);

    const [amount, setAmount] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [note, setNote] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        setError("");

        const numericAmount = Number(amount);

        if (!amount || numericAmount <= 0) {
            setError("Enter valid amount");
            return;
        }

        if (!categoryId || !date) {
            setError("Fill all fields");
            return;
        }

        dispatch(
            addTransaction({
                amount: numericAmount,
                categoryId,
                note,
                date,
            }),
        );

        // reset
        setAmount("");
        setCategoryId("");
        setNote("");
        setDate("");
    };

    return (
        <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-xl space-y-4">
            <h2 className="text-zinc-900 dark:text-white font-semibold">
                Add Transaction
            </h2>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <input
                type="number"
                className="w-full p-2 bg-zinc-200 dark:bg-zinc-700 rounded text-zinc-900 dark:text-white placeholder:text-zinc-500"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <select
                className="w-full p-2 bg-zinc-200 dark:bg-zinc-700 rounded text-zinc-900 dark:text-white"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
            >
                <option value="">Select Category</option>

                {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>

            <input
                className="w-full p-2 bg-zinc-200 dark:bg-zinc-700 rounded text-zinc-900 dark:text-white placeholder:text-zinc-500"
                placeholder="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />

            <input
                type="date"
                className="w-full p-2 bg-zinc-200 dark:bg-zinc-700 rounded text-zinc-900 dark:text-white"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 hover:bg-blue-600 transition p-2 rounded text-white"
            >
                Add
            </button>
        </div>
    );
};

export default TransactionForm;
