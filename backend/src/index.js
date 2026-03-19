import { app } from "./app.js";

app.on("error", (error) => {
    console.log("error", error);
});

app.listen(8000, () => {
    console.log(`Running server on PORT 8000`);
    
})