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
        <div className="bg-slate-800 p-6 rounded-xl space-y-4">
            <h2>Add Transaction</h2>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <input
                type="number"
                className="w-full p-2 bg-slate-700 rounded"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <select
                className="w-full p-2 bg-slate-700 rounded"
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
                className="w-full p-2 bg-slate-700 rounded"
                placeholder="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />

            <input
                type="date"
                className="w-full p-2 bg-slate-700 rounded"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 p-2 rounded"
            >
                Add
            </button>
        </div>
    );
};

export default TransactionForm;
