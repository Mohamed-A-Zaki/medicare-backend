import mongoose, { Document } from "mongoose";
import IPatient from "../types/patient.type";

const { model, Schema } = mongoose;

const PatientSchema = new Schema<IPatient>(
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
    bloodType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Patient = model<IPatient>("Patient", PatientSchema);
