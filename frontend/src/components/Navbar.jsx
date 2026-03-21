import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="bg-slate-800 px-6 py-4 flex justify-between items-center shadow-md">
            <div className="flex">
            <img className="h-10 w-10" src="../../public/favicon.svg" alt="Logo" />
            <h1 className="text-xl font-bold text-white">Expense Tracker</h1>
            </div>

            <div className="flex items-center gap-6 text-white">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "text-blue-400" : "hover:text-blue-400"
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/transactions"
                    className={({ isActive }) =>
                        isActive ? "text-blue-400" : "hover:text-blue-400"
                    }
                >
                    Transactions
                </NavLink>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 cursor-pointer active:bg-red-700"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
