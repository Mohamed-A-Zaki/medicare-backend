import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import validator from "validator";
import { Doctor } from "../../models/DoctorModel";
import { Patient } from "../../models/PatientModel";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/generateToken";
import IRegisterBody from "../../types/register_body.type";

export const register = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password, role, photo, gender } =
      req.body as IRegisterBody;

    /***
     *  check if all fields are present
     */
    if (!name) {
      throw new Error("name is required");
    }

    if (!email) {
      throw new Error("email is required");
    }

    if (!password) {
      throw new Error("password is required");
    }

    if (!role) {
      throw new Error("role is required");
    }

    /**
     * validate email and password
     */

    if (!validator.isEmail(email)) {
      throw new Error("email is invalid");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error("password is weak");
    }

    /****
     * check if email already exists
     */

    if (await Doctor.findOne({ email })) {
      throw new Error("email already exists");
    }

    if (await Patient.findOne({ email })) {
      throw new Error("email already exists");
    }

    /***
     * hash password
     */
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    /***
     * create user
     */
    const user = {
      name,
      email,
      password: hashedPassword,
      photo,
      gender,
    };

    if (role === "doctor") {
      const { email, name, gender, photo, _id } = await Doctor.create(user);
      res.json({
        user: { id: _id, name, email, photo, gender },
        token: generateToken(_id as string),
      });
    }

    if (role === "patient") {
      const { name, email, photo, gender, _id } = await Patient.create(user);
      res.json({
        user: { id: _id, name, email, photo, gender },
        token: generateToken(_id as string),
      });
    }
  }
);
