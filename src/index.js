import "dotenv/config";
import express from "express";
import { connectDB } from "./db/connect.js";
import { userRoute, noteRoute } from "./modules/index.js";
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
connectDB();

app.use("/users", userRoute);
app.use("/notes", noteRoute);

// Global middleware error handler
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    err.cause = 400;
  }
  res
    .status(err.cause || 500)
    .json({ message: err.message, success: false, stack: err.stack });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
