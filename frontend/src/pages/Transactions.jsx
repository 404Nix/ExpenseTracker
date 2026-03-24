import TransactionForm from "../components/TransactionForm";
import CategoryPanel from "../components/CategoryPanel";
import TransactionsList from "../components/TransactionsList";

const Transactions = () => {
    return (
        <div className="p-6 text-zinc-900 dark:text-white space-y-6">
            <h1 className="text-2xl font-bold">Transactions</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TransactionForm />
                <CategoryPanel />
            </div>

            <TransactionsList />
        </div>
    );
};

export default Transactions;