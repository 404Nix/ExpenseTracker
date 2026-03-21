import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // remove token
        navigate("/login"); // go to login
    };

    return (
        <div className="bg-slate-800 px-6 py-4 flex justify-between items-center shadow-md">
            <h1 className="text-xl font-bold text-white">Expense Tracker</h1>

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
                    to="/analytics"
                    className={({ isActive }) =>
                        isActive ? "text-blue-400" : "hover:text-blue-400"
                    }
                >
                    Analytics
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
