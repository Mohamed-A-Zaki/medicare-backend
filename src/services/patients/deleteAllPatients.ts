import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { Patient } from './../../models/PatientModel';

export const deleteAllPatients = expressAsyncHandler(
  async (req: Request, res: Response) => {
    /***
     * Delete all doctors
     */
    await Patient.deleteMany({});

    /***
     * Send the response
     */
    res.json();
  }
);
