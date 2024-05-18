import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { Doctor } from "../../models/DoctorModel";

export const deleteAllDoctors = expressAsyncHandler(
  async (req: Request, res: Response) => {
    /***
     * Delete all doctors
     */
    await Doctor.deleteMany({});

    /***
     * Send the response
     */
    res.json();
  }
);
