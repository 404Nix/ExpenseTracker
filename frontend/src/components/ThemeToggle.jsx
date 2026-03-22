import { useEffect, useState } from "react";

const ThemeToggle = () => {
    const [dark, setDark] = useState(
        () => localStorage.getItem("theme") === "dark",
    );

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [dark]);

    return (
        <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm text-zinc-900 dark:text-white">
                {dark ? "🌙" : "☀️"}
            </span>

            <div className="relative">
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={dark}
                    onChange={() => setDark(!dark)}
                />
                <div
                    className={`w-11 h-6 rounded-full transition-colors duration-300 ${
                        dark ? "bg-blue-500" : "bg-zinc-300"
                    }`}
                />
                <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
                        dark ? "translate-x-5" : "translate-x-0"
                    }`}
                />
            </div>
        </label>
    );
};

export default ThemeToggle;
