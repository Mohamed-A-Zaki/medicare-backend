import { Response, Request } from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { Patient } from "../../models/PatientModel";

export const deleteOnePatient = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    /***
     * Check if the id is valid
     */
    if (!mongoose.isValidObjectId(id)) {
      throw new Error("Invalid ID");
    }

    /***
     * Find the doctor and delete it
     */
    await Patient.findByIdAndDelete(id);

    /***
     * Send the response
     */
    res.json();
  }
);
