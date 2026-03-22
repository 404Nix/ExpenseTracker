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
        <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-xl">
            <h2 className="mb-4 text-zinc-900 dark:text-white font-semibold">
                Categories
            </h2>

            <div className="flex gap-2 mb-4">
                <input
                    className="flex-1 p-2 bg-zinc-200 dark:bg-zinc-700 rounded text-zinc-900 dark:text-white placeholder:text-zinc-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <button
                    onClick={handleAdd}
                    className="bg-blue-500 hover:bg-blue-600 transition px-3 rounded text-white"
                >
                    Add
                </button>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="flex flex-wrap gap-2">
                {items.map((c) => (
                    <div
                        key={c.id}
                        className="bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white px-3 py-1 rounded-full flex gap-2 items-center"
                    >
                        {c.name}

                        <button
                            onClick={() => dispatch(deleteCategory(c.id))}
                            className="text-red-400 text-xs cursor-pointer hover:text-red-600"
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
