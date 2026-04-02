import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Transactions from "./pages/Transactions.jsx";
import Hero from "./pages/Hero.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Hero />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <App />
                    </ProtectedRoute>
                }
            >
                <Route
                    index
                    element={<Dashboard />}
                    loader={async () => {
                        try {
                            const res = await fetch(
                                `${import.meta.env.VITE_ENDPOINT}/api/auth/me`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                                    },
                                },
                            );

                            if (!res.ok)
                                throw new Error("Failed to fetch user");

                            const data = await res.json();
                            return data.user;
                        } catch (error) {
                            console.error("Error fetching user:", error);
                            return null;
                        }
                    }}
                />
                <Route path="transactions" element={<Transactions />} />
            </Route>
        </>,
    ),
);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>,
);
