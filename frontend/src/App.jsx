import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-white">
            <Navbar />
            <Outlet />
        </div>
    );
}

export default App;
