import express from "express";
import router from "./routes/users/users";

const app = express();
app.use(express.json());
app.use("/api", router);

app.use((req, res) => res.status(404).json({ message: "Resource not found" }));

export default app;
