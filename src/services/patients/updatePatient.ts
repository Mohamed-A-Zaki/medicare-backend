import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { Patient } from "../../models/PatientModel";

export const updatePatient = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    /**
     * Check if the id is valid
     */
    if (!mongoose.isValidObjectId(id)) {
      throw new Error("Invalid id");
    }

    /***
     * check if the patient exists
     */
    if (!(await Patient.findById(id))) {
      throw new Error("patient not found");
    }

    /***
     * update the patient
     */
    const patient = await Patient.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password");

    /***
     * send the updated patient
     */
    res.json(patient);
  }
);
