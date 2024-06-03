import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
mongoose.set("strictQuery", true);
dotenv.config();
mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    app.listen(3030, () => {
      console.log("Server running. Use our API on port: 3030");
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
