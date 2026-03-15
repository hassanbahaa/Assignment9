import express from "express";
import { connectDB } from "./db/connect.js";

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
connectDB();
// Global middleware error handler
app.use((err, req, res, next) => {
  res.status(err.cause || 500).json({ message: err.message, success: false });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
