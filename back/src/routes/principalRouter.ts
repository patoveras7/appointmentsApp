import {Router} from "express";
//import { createUsers, getUsers, deleteUsers } from "../controllers/usersController";
import usersRoutes from "./usersRoutes";
import appointmentsRoutes from "./appointmentsRoutes";


const globalRouter: Router = Router();// Router funciona como una especie de constructor retornando un objeto con cierta estructura.


globalRouter.use("/users", usersRoutes)// Ingresa por el enrutador general y es a "users" la request se dirige a las rutas de users.
globalRouter.use ("/appointments", appointmentsRoutes)// Como SEGUN LA CONSIGNA hay diferencia entre las posibles direcciones de la ruta,
// se coloca solo una '/' y el router evaluara al llegar al enrutador secundario como procede.







// router.get("/users"); // Endpoint
// router.post("/users", createUsers);
// router.delete("/users");



export default globalRouter;
