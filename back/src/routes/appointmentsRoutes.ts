import {Router} from "express";// Importamos la interfaz Router, luego creamos una instancia del Router para exportarla.
const appointmentsRouter: Router = Router(); // El tipo de dato lo deduce TS pero es buena practica consignarlo.
import { getAllAppointments, getAppointmentDetails, createNewAppointment, cancelAppointment } from "../controllers/appointmentsControllers";


appointmentsRouter.get("/", getAllAppointments);
appointmentsRouter.get("/:id", getAppointmentDetails);
appointmentsRouter.post("/schedule", createNewAppointment);
appointmentsRouter.put("/cancel/:id", cancelAppointment);







export default appointmentsRouter; 