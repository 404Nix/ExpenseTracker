import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import CategoryPanel from "../components/CategoryPanel";
import TransactionsList from "../components/TransactionsList";

const Transactions = () => {
    const [categories, setCategories] = useState([]);
    const [refreshFlag, setRefreshFlag] = useState(false);

    const fetchCategories = async () => {
        const res = await fetch("http://localhost:8000/api/categories", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const data = await res.json();
        setCategories(data.categories || []);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const triggerRefresh = () => {
        setRefreshFlag((prev) => !prev);
    };

    return (
        <div className="p-6 text-zinc-900 dark:text-white space-y-6">
            <h1 className="text-2xl font-bold">Transactions</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TransactionForm
                    categories={categories}
                    onSuccess={triggerRefresh}
                />

                <CategoryPanel
                    categories={categories}
                    refreshCategories={fetchCategories}
                />
            </div>

            <TransactionsList refreshFlag={refreshFlag} />
        </div>
    );
};

export default Transactions;
