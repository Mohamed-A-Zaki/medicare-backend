import { Document } from "mongoose";

interface IPatient extends Document {
  name: string;
  email: string;
  password: string;
  photo: string;
  phone: string;
  gender: "male" | "female" | "other";
  bloodType: string;
}

export default IPatient;
