import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCategories,
    addCategory,
    deleteCategory,
} from "../features/categorySlice";

const CategoryPanel = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.categories);

    const [name, setName] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleAdd = () => {
        setError("");

        if (!name.trim()) {
            setError("Enter category name");
            return;
        }

        dispatch(addCategory(name));
        setName("");
    };

    return (
        <div className="bg-slate-800 p-6 rounded-xl">
            <h2 className="mb-4">Categories</h2>

            <div className="flex gap-2 mb-4">
                <input
                    className="flex-1 p-2 bg-slate-700 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <button
                    onClick={handleAdd}
                    className="bg-blue-500 px-3 rounded"
                >
                    Add
                </button>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="flex flex-wrap gap-2">
                {items.map((c) => (
                    <div
                        key={c.id}
                        className="bg-slate-700 px-3 py-1 rounded-full flex gap-2 items-center"
                    >
                        {c.name}

                        <button
                            onClick={() => dispatch(deleteCategory(c.id))}
                            className="text-red-400 text-xs"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryPanel;
