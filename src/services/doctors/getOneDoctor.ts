import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { Doctor } from "../../models/DoctorModel";
import mongoose from "mongoose";

export const getOneDoctor = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    /***
     * Check if the id is valid
     */
    if (!mongoose.isValidObjectId(id)) {
      throw new Error("Invalid id");
    }

    /***
     * Find the doctor
     */
    const doctor = await Doctor.findById(id).select("-password");

    /***
     * Check if the doctor exists
     */
    if (!doctor) {
      throw new Error("Doctor not found");
    }

    /***
     * Send the doctor
     */
    res.json(doctor);
  }
);
