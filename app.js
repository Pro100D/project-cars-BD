import express from "express";
import logger from "morgan";
import cors from "cors";
import carsRouter from "./routes/api/cars.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/cars", carsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, massage = "Server error" } = err;
  res.status(status).json({ massage });
});

export default app;
