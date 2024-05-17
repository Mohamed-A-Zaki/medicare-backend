import mongoose from "mongoose";
import IDoctor from "../types/doctor.type";

const { model, Schema } = mongoose;

const DoctorSchema = new Schema<IDoctor>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    phone: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    specialization: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Doctor = model<IDoctor>("Doctor", DoctorSchema);
