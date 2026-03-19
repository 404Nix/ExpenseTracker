import express, { urlencoded } from "express";
import cors from "cors"
import morgan from "morgan"
import userRouter from "./routes/user.route.js"
import budgetRouter from "./routes/budget.route.js"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
}))
app.use(morgan('dev'));
app.use(express.json({limit: '1mb'}))  //Following the industry standards here {1mb}
app.use(urlencoded({extended: true}))
app.use(express.static("public"))

// routes
app.use("/api/auth", userRouter)
app.use("/api/budget", budgetRouter)

app.get('/test', (_req, res) => {
  res.json({ ok: true });
});

export { app };