
import { DataSource } from "typeorm";

import { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DB } from "./envs";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import { Appointment } from "../entities/Appointment";

export const AppDataSource = new DataSource({ 
    type: "postgres", // Tipo de gestor
    host: DB_HOST, // Host de la base de datos
    port: Number(DB_PORT), // Puerto de la base de datos => Lo que viene por variable de entorno viene por STRING si se pide un numero hay que parsear. 
    username: DB_USERNAME, // Usuario de la base de datos
    password: DB_PASSWORD, // Contraseña de la base de datos => Atento aca pato porque tu pass tiene numeros y caratceres especiales.
    database: DB_DB, // Nombre de la base de datos
    synchronize: true, // Para que cuando creemos las entidades directamente nos cree las tablas.
    logging: false, // Si estuviera en true iria consologueando TODAS LAS QUERYS que les vamos haciendo a las BD  Pero como se llena la consola
    // de contenido lo dejamos en false.
    entities: [User, Credential, Appointment],
    subscribers: [],
    migrations: [],
    //dropSchema: true
})

export const initializationDbConnetion = async () => {
    try {
        const connection = await AppDataSource.initialize(); // Para conectar con la base de datos copiamos el objeto de la documentacion, le cargamos todos los datos de la BD nuestra
        // y luego usando dicho objeto inicializamos la concexion.
        if(connection.isInitialized) console.log("DB connected");
        
    } catch (error) {
        console.log(error);
        
    }
}