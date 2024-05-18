import express from "express";
import { getAllPatients } from "./../services/patients/getAllPatients";
import { deleteAllPatients } from "./../services/patients/deleteAllPatients";
import { getOnePatient } from "./../services/patients/getOnePatient";
import { deleteOnePatient } from "./../services/patients/deleteOnePatient";
import { updatePatient } from "./../services/patients/updatePatient";

const patient_route = express.Router();

patient_route.route("/").get(getAllPatients).delete(deleteAllPatients);
patient_route
  .route("/:id")
  .get(getOnePatient)
  .delete(deleteOnePatient)
  .put(updatePatient);

export default patient_route;
