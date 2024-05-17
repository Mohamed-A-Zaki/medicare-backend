import { Request, Response } from "express";
import ILoginBody from "../../types/login_body.type";
import expressAsyncHandler from "express-async-handler";
import { Patient } from "../../models/PatientModel";
import { Doctor } from "../../models/DoctorModel";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/generateToken";

export const login = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body as ILoginBody;

    /***
     *  check if all fields are present
     */
    if (!email) {
      throw new Error("Email is required");
    }

    if (!password) {
      throw new Error("Password is required");
    }

    /***
     * check if email exists
     */
    const doctor = await Doctor.findOne({ email });
    const patient = await Patient.findOne({ email });

    if (!doctor && !patient) {
      throw new Error("User not found");
    }

    /**
     * check if password is correct
     */
    if (doctor) {
      if (!bcrypt.compare(password, doctor.password)) {
        throw new Error("Invalid credentials");
      }
    }

    if (patient) {
      if (!bcrypt.compare(password, patient.password)) {
        throw new Error("Invalid credentials");
      }
    }

    if (doctor) {
      const { name, email, photo, gender, _id } = doctor;
      res.json({
        user: { id: _id, name, email, photo, gender },
        token: generateToken(_id as string),
      });
    }

    if (patient) {
      const { name, email, photo, gender, _id } = patient;
      res.json({
        user: { id: _id, name, email, photo, gender },
        token: generateToken(_id as string),
      });
    }
  }
);
