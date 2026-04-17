import { lazy, StrictMode, Suspense } from "react";
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
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Lazy imports
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Transactions = lazy(() => import("./pages/Transactions.jsx"));
const Hero = lazy(() => import("./pages/Hero.jsx"));

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Public Routes */}
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
                path="/dashboard"
                element={
                    // <ProtectedRoute>
                    //     <App />
                    // </ProtectedRoute>
                    <App/>
                }
            >
                {/* Default dashboard page */}
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

                {/* FIXED: relative path (no /) */}
                <Route path="transactions" element={<Transactions />} />
            </Route>
        </>,
    ),
);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <Suspense fallback={<div>Loading...</div>}>
                <RouterProvider router={router} />
            </Suspense>
        </Provider>
    </StrictMode>,
);
