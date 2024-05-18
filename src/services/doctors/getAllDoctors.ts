import expressAsyncHandler from "express-async-handler";
import { Doctor } from "./../../models/DoctorModel";
import { Request, Response } from "express";

export const getAllDoctors = expressAsyncHandler(
  async (req: Request, res: Response) => {
    /***
     * get all doctors
     */
    const doctors = await Doctor.find({}).select("-password");

    /***
     * send the doctors
     */
    res.json(doctors);
  }
);
