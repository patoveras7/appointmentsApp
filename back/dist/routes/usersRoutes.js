"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // Importamos la interfaz Router, luego creamos una instancia del Router para exportarla.
const userRouter = (0, express_1.Router)(); // El tipo de dato lo deduce TS pero es buena practica consignarlo.
const usersController_1 = require("../controllers/usersController");
userRouter.get("/", usersController_1.getAllUsers);
userRouter.get("/:id", usersController_1.getUserById);
userRouter.post("/register", usersController_1.registerNewUser);
userRouter.post("/login", usersController_1.loginUser);
exports.default = userRouter;
