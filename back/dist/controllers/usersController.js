"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerNewUser = exports.getUserById = exports.getAllUsers = void 0;
const users_Services_1 = require("../services/users.Services");
const credentials_Services_1 = require("../services/credentials.Services");
// Declaramos las funciones y las exporamos para importarlas desde las rutas.
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Cuando pasamos por parametro TS no tiene ninguna referencia para "deducir" el tipo de dato, por lo tanto siempre hay que consignarlo.    
    try {
        const allUsers = yield (0, users_Services_1.getAllUsersServices)();
        //Pasamos ERRORES CONTROLADOS
        return allUsers.length ? res.status(200).json(allUsers) : res.status(404).json({ message: "No hay usuarios registrados" });
    }
    catch (error) {
        // Pasamos ERRORES NO CONTROLADOS
        return res.status(500).json(error);
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userById = yield (0, users_Services_1.getUserByIdServices)(+id); // TODO LO QUE VIENE POR PARAMETRO VIENE EN STRING Y GUARDA!! PORQUE JS NO AVISA DE ESO, ENTONCES SI 
        // LO QUE VIENE EN STRING NECESITAMOS CONVERTIRLO A NUMERO LE PONEMOS UN + ADELANTE (ESA ES SOLO UNA OPCION).    
        return userById ? res.status(200).json(userById) : res.status(404).json({ error: "El usuario solicitado no existe" });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.getUserById = getUserById;
const registerNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, birthdate, nDni, username, password } = req.body;
        if (!name || !email || !birthdate || !nDni || !username || !password)
            return res.status(400).json({ error: "Todos los campos son obligatorios" }); // El return corta la ejecucion y envia una respuesta (Buena practica poner return). La unica forma de no preocuparse por el return es poner un middleware.
        const newUser = yield (0, users_Services_1.createUserServices)({ name, email, birthdate, nDni, username, password }); // Se puede pasar req.body pero es conveniente pasar distractoring. 
        return newUser ? res.status(201).json(newUser) : res.status(400).json({ error: "No fue posible crear el usuario." });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.registerNewUser = registerNewUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const loginUser = yield (0, credentials_Services_1.checkCredentials)({ username, password });
        if (loginUser) {
            const user = yield (0, users_Services_1.getUserByIdServices)(loginUser);
            return res.status(200).json({ login: "true", user });
        }
        else {
            return res.status(400).json({ error: "Credenciales incorrectas" });
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.loginUser = loginUser;
// Demo
// import { createUsersService, getUsersService, deleteUsersService } from "../services/usersService"
// import IUser from "../interfaces/IUser";
// export const getUsers = async () => {
// }
// export const createUsers = async (req: Request, res: Response) => {
// const { name, email, active } = req.body; // Desestracturamos lo que viene por body en la Request.
// const newUser: IUser = await createUsersService({name, email, active}); // El controlador va a llamar a una funcion del servicio y le va a pasar un objeto con informacion.
// // Si en el caso anterior NO colocamos el awair va a generar un error porque la funcion que llamamos es una promesa
// // no es un IUser. Lo que nosotros queremos es el resultado de esa promesa que se compatibiizaria con el IUser.
// res.status(201).json(newUser);
// }
// export const deleteUsers = async () => {
// }
