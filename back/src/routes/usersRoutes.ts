import {Router} from "express";// Importamos la interfaz Router, luego creamos una instancia del Router para exportarla.
const userRouter: Router = Router(); // El tipo de dato lo deduce TS pero es buena practica consignarlo.
import { getAllUsers, getUserById, registerNewUser, loginUser } from "../controllers/usersController";


userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/register", registerNewUser);
userRouter.post("/login", loginUser);







export default userRouter; 