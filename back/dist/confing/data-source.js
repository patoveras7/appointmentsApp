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
exports.initializationDbConnetion = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
const User_1 = require("../entities/User");
const Credential_1 = require("../entities/Credential");
const Appointment_1 = require("../entities/Appointment");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres", // Tipo de gestor
    host: envs_1.DB_HOST, // Host de la base de datos
    port: Number(envs_1.DB_PORT), // Puerto de la base de datos => Lo que viene por variable de entorno viene por STRING si se pide un numero hay que parsear. 
    username: envs_1.DB_USERNAME, // Usuario de la base de datos
    password: envs_1.DB_PASSWORD, // Contraseña de la base de datos => Atento aca pato porque tu pass tiene numeros y caratceres especiales.
    database: envs_1.DB_DB, // Nombre de la base de datos
    synchronize: true, // Para que cuando creemos las entidades directamente nos cree las tablas.
    logging: false, // Si estuviera en true iria consologueando TODAS LAS QUERYS que les vamos haciendo a las BD  Pero como se llena la consola
    // de contenido lo dejamos en false.
    entities: [User_1.User, Credential_1.Credential, Appointment_1.Appointment],
    subscribers: [],
    migrations: [],
    //dropSchema: true
});
const initializationDbConnetion = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield exports.AppDataSource.initialize(); // Para conectar con la base de datos copiamos el objeto de la documentacion, le cargamos todos los datos de la BD nuestra
        // y luego usando dicho objeto inicializamos la concexion.
        if (connection.isInitialized)
            console.log("DB connected");
    }
    catch (error) {
        console.log(error);
    }
});
exports.initializationDbConnetion = initializationDbConnetion;
