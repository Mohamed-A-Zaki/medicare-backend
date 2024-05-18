import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Patient } from "../../models/PatientModel";

export const getAllPatients = expressAsyncHandler(
  async (req: Request, res: Response) => {
    /***
     * get all patients
     */
    const patients = await Patient.find({}).select("-password");

    /***
     * send the patients
     */
    res.json(patients);
  }
);
