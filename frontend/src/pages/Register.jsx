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
        const res = await fetch("http://localhost:8000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message);
            return;
        }

        localStorage.setItem("token", data.token);

        navigate("/");
    };

    return (
        <div className="h-screen flex items-center justify-center bg-slate-900 text-white">
            <div className="bg-slate-800 p-6 rounded-xl w-80">
                <h1 className="text-xl mb-4">Register</h1>

                <input
                    className="w-full mb-3 p-2 rounded bg-slate-700"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className="w-full mb-3 p-2 rounded bg-slate-700"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="w-full mb-3 p-2 rounded bg-slate-700"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
                <button
                    onClick={handleRegister}
                    className="w-full bg-blue-500 p-2 rounded"
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
