import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { Patient } from "../../models/PatientModel";

export const getOnePatient = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    /***
     * Check if the id is valid
     */
    if (!mongoose.isValidObjectId(id)) {
      throw new Error("Invalid id");
    }

    /***
     * Find the patient
     */
    const patient = await Patient.findById(id).select("-password");

    /***
     * Check if the patient exists
     */
    if (!patient) {
      throw new Error("patient not found");
    }

    /***
     * Send the patient
     */
    res.json(patient);
  }
);
