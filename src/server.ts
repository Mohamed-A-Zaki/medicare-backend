import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import auth_route from "./routes/auth_route";
import { error_handler } from "./middlewares/error_handler";
import doctor_route from "./routes/doctor_route";
import patient_route from "./routes/patient_route";

const app = express();

dotenv.config();

/***
 * Middlewares
 */
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/auth", auth_route);
app.use("/api/v1/doctors", doctor_route);
app.use("/api/v1/patients", patient_route);

app.use(error_handler);

/***
 * Connect to database
 */
const connectToDatabase = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DB_URI!);
    console.log(`connected to DB ${connection.host} ${connection.name}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectToDatabase();

/***
 * start the server
 */
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
