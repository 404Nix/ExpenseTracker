import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="bg-zinc-100 dark:bg-zinc-800 px-6 py-4 flex justify-between items-center shadow-md border-b border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center">
                <img
                    className="h-15 w-15 object-contain"
                    src="/favicon.svg"
                    alt="Logo"
                />

                <h1 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                    Expense Tracker
                </h1>
            </div>

            <div className="flex items-center gap-6 text-zinc-900 dark:text-white">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive
                            ? "text-blue-100 bg-blue-400 rounded-2xl px-3 py-1"
                            : "hover:text-blue-400"
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/dashboard/transactions"
                    className={({ isActive }) =>
                        isActive
                            ? "text-blue-100 bg-blue-400 rounded-2xl px-3 py-1"
                            : "hover:text-blue-400"
                    }
                >
                    Transactions
                </NavLink>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 cursor-pointer active:bg-red-700 text-white"
                >
                    Logout
                </button>
                <ThemeToggle />
            </div>
        </div>
    );
};

export default Navbar;
