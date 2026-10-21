import express from "express";
import cors from "cors";
import router from "./routes/healthcheck.router.js";
import { registerUser } from "./Controllers/registerUser.controller.js";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/instagram", (req, res) => {
  res.send("muaaz instagram is here !");
});

// basic configuration
app.use(express.json({ limit: "16Kb" }));
app.use(express.urlencoded({ extended: true, limit: "16Kb" }));
app.use(express.static("public"));

//Cors Cofigurationn
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "https://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);

app.use("/api/v1/healthcheck", router);

app.use("/api/v1/auth", registerUser);

export default app;
