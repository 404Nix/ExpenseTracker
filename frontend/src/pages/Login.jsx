import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError(""); // clear previous error

        const res = await fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message); // ✅ show error in UI
            return;
        }

        if (data.token) {
            localStorage.setItem("token", data.token);
            navigate("/");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
            <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-xl w-80">
                <h1 className="text-xl mb-4">Login</h1>

                <input
                    className="w-full mb-3 p-2 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="w-full mb-3 p-2 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 hover:bg-blue-600 transition p-2 rounded text-white"
                >
                    Login
                </button>
                <Link
                    to="/register"
                    className="text-blue-500 hover:underline mt-4 block text-center"
                >
                    Don't have an account? Register
                </Link>
            </div>
        </div>
    );
};

export default Login;
