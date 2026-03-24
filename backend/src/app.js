import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.route.js";
import budgetRouter from "./routes/budget.route.js";
import categoryRouter from "./routes/category.route.js";
import transactionRouter from "./routes/transaction.route.js";
import analyticsRouter from "./routes/analytics.route.js"

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN.split(","),
        credentials: true,
    }),
);
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" })); //Following the industry standards here {1mb}
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));

// routes
app.use("/api/auth", userRouter);
app.use("/api/budgets", budgetRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/analytics", analyticsRouter)

export { app };
