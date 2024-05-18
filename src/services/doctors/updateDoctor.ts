import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { Doctor } from "../../models/DoctorModel";

export const updateDoctor = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    /**
     * Check if the id is valid
     */
    if (!mongoose.isValidObjectId(id)) {
      throw new Error("Invalid id");
    }

    /***
     * check if the doctor exists
     */
    if (!(await Doctor.findById(id))) {
      throw new Error("Doctor not found");
    }

    /***
     * update the doctor
     */
    const doctor = await Doctor.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password");

    /***
     * send the updated doctor
     */
    res.json(doctor);
  }
);
