import { Document } from "mongoose";

interface IDoctor extends Document {
  name: string;
  email: string;
  password: string;
  photo?: string;
  phone: string;
  gender: "male" | "female" | "other";
  specialization: string;
}


export default IDoctor