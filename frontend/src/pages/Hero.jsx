import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const Hero = () => {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white overflow-hidden relative selection:bg-blue-500/30">
            {/* Background Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-pulse dark:bg-blue-600/20 dark:mix-blend-screen" />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-pulse animation-delay-2000 dark:bg-emerald-600/20 dark:mix-blend-screen" />
            <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-pulse animation-delay-4000 dark:bg-purple-600/20 dark:mix-blend-screen" />

            <div className="relative z-10 container mx-auto px-6 py-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-16 lg:mb-24">
                    <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                        <img className="h-10 w-10 object-contain drop-shadow-md" src="/favicon.svg" alt="Logo" />
                        <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400">
                            Expense Tracker
                        </h1>
                    </div>
                    <ThemeToggle />
                </header>

                {/* Main Content */}
                <main className="flex flex-col items-center text-center mt-10 md:mt-20 max-w-4xl mx-auto space-y-8">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-blue-200 dark:border-zinc-800 bg-blue-50/50 dark:bg-zinc-900/50 backdrop-blur-sm text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide shadow-sm mb-4 transition duration-300 hover:shadow-blue-500/20">
                        Master Your Finances Today 🚀
                    </div>

                    <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                        Take Control of Your <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500">
                            Financial Future
                        </span>
                    </h2>

                    <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        Effortlessly track your spending, analyze trends, and achieve your goals with our beautiful, intuitive expense management platform.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-5 pt-8 w-full sm:w-auto px-6 sm:px-0">
                        <Link
                            to="/register"
                            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:-translate-y-1 transition-all duration-200 active:scale-95"
                        >
                            Get Started Free
                        </Link>
                        <Link
                            to="/login"
                            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-900 dark:text-white rounded-xl font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-sm transform hover:-translate-y-1 transition-all duration-200 active:scale-95"
                        >
                            Login to Account
                        </Link>
                    </div>
                </main>
            </div>
            {/* Fade Out Gradient at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 to-transparent z-20 pointer-events-none"></div>
        </div>
    );
};

export default Hero;
