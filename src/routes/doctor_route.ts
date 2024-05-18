import express from "express";
import { getAllDoctors } from "../services/doctors/getAllDoctors";
import { getOneDoctor } from "../services/doctors/getOneDoctor";
import { deleteOneDoctor } from "../services/doctors/deleteOneDoctor";
import { deleteAllDoctors } from "../services/doctors/deleteAllDoctors";
import { updateDoctor } from "../services/doctors/updateDoctor";

const doctor_route = express.Router();

doctor_route.route("/").get(getAllDoctors).delete(deleteAllDoctors);
doctor_route
  .route("/:id")
  .get(getOneDoctor)
  .delete(deleteOneDoctor)
  .put(updateDoctor);

export default doctor_route;
