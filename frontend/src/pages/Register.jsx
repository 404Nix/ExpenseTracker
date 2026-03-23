import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {
        const res = await fetch(`${import.meta.env.VITE_ENDPOINT}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();

        if(!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!res.ok) {
            setError(data.message);
            return;
        }

        localStorage.setItem("token", data.token);

        navigate("/");
    };

    return (
        <div className="h-screen flex items-center justify-center bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
            <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-xl w-80">
                <h1 className="text-xl mb-4">Register</h1>

                <input
                    className="w-full mb-3 p-2 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className="w-full mb-3 p-2 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="w-full mb-3 p-2 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
                <button
                    onClick={handleRegister}
                    className="w-full bg-blue-500 hover:bg-blue-600 transition p-2 rounded text-white"
                >
                    Register
                </button>
                <Link
                    to="/login"
                    className="text-blue-500 hover:underline mt-4 block text-center"
                >
                    Already have an account? Login
                </Link>
            </div>
        </div>
    );
};

export default Register;
