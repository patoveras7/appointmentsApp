"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import { createUsers, getUsers, deleteUsers } from "../controllers/usersController";
const usersRoutes_1 = __importDefault(require("./usersRoutes"));
const appointmentsRoutes_1 = __importDefault(require("./appointmentsRoutes"));
const globalRouter = (0, express_1.Router)(); // Router funciona como una especie de constructor retornando un objeto con cierta estructura.
globalRouter.use("/users", usersRoutes_1.default); // Ingresa por el enrutador general y es a "users" la request se dirige a las rutas de users.
globalRouter.use("/appointments", appointmentsRoutes_1.default); // Como SEGUN LA CONSIGNA hay diferencia entre las posibles direcciones de la ruta,
// se coloca solo una '/' y el router evaluara al llegar al enrutador secundario como procede.
// router.get("/users"); // Endpoint
// router.post("/users", createUsers);
// router.delete("/users");
exports.default = globalRouter;
