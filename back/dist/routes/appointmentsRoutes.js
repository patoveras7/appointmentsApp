"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // Importamos la interfaz Router, luego creamos una instancia del Router para exportarla.
const appointmentsRouter = (0, express_1.Router)(); // El tipo de dato lo deduce TS pero es buena practica consignarlo.
const appointmentsControllers_1 = require("../controllers/appointmentsControllers");
appointmentsRouter.get("/", appointmentsControllers_1.getAllAppointments);
appointmentsRouter.get("/:id", appointmentsControllers_1.getAppointmentDetails);
appointmentsRouter.post("/schedule", appointmentsControllers_1.createNewAppointment);
appointmentsRouter.put("/cancel/:id", appointmentsControllers_1.cancelAppointment);
exports.default = appointmentsRouter;
