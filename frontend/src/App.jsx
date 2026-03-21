import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="bg-slate-900 min-h-screen text-white">
            <Navbar />
            <Outlet />
        </div>
    );
}

export default App;
