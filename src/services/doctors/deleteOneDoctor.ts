import { Response, Request } from "express";
import expressAsyncHandler from "express-async-handler";
import { Doctor } from "../../models/DoctorModel";
import mongoose from "mongoose";

export const deleteOneDoctor = expressAsyncHandler(
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
    await Doctor.findByIdAndDelete(id);

    /***
     * Send the response
     */
    res.json();
  }
);
