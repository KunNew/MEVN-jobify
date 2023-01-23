import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import connectDB from "./config/db.js";
import cors from "cors";
import morgan from "morgan";
import path from "path";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

connectDB();

const port = process.env.PORT || 5000;

app.use(`/api/auth`, authRoutes);
app.use(`/api/jobs`, jobRoutes);

app.use(errorHandler);
app.use(notFound);

app.listen(port, (req, res) => {
  console.log(`server is running on ${port}`.yellow.bold);
});
