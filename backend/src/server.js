import { app } from "./app.js";
import { DB_NAME } from "./constant.js";
import mongoDbConnection from "./db/index.js";

mongoDbConnection()
    .then(() => {
        app.on("error", (error) => {
            console.error("Failed to start server", error);
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`API listening on http://localhost:${process.env.PORT}`);
            
        })
    })
    .catch((err) => {
        console.error('Failed to start API. Check MongoDB and .env.', err.message);
        process.exit(1);
    });
