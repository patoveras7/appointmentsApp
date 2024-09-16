"use strict";
// Hay que crear credenciales y subirlas a un arreglo simulando base de datos por lo cual hay que importar la interfaz, ya que el tipo de dato
// de esa BDD va a ser la interfaz.
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
exports.checkCredentials = exports.createUserCredentialsServices = void 0;
const Credential_1 = require("../entities/Credential");
const data_source_1 = require("../confing/data-source");
// const credentialsDB: ICredential[] = []; // Aqui ya nos aseguramos el respeto de la estructura que proporciona la interfaz.
// let id = 1; // Luego con el ORM ya se va a generar automaticamente.
const conectionDB = data_source_1.AppDataSource.getRepository(Credential_1.Credential);
const createUserCredentialsServices = (credential) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = credential; // Desestructuramos la informacion que recibimos.
    const newCredential = conectionDB.create({
        //id No es necesario porque la base de datos ya la genera.
        username,
        password
    });
    yield conectionDB.save(newCredential);
    return newCredential;
});
exports.createUserCredentialsServices = createUserCredentialsServices;
const checkCredentials = (credential) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = credential;
    const foundCredential = yield conectionDB.findOne({ where: { username },
        relations: ["user"] } // Si lo encuentra tambien trae la relacion con el usuario.
    ); // Este metodo recorre el arreglo buscando un valor y retornando un booleano con el resultado de busqueda.
    // cred representa cada objeto del arreglo. Y puede encontrarse un usuario que va a respetar ICredential o no encontrar nada por eso se coloca undefined tambien como tipo de dato.
    if ((foundCredential === null || foundCredential === void 0 ? void 0 : foundCredential.password) === password)
        return foundCredential.user.id; //NUEVA FORMA DE IF, se consulta y en base a eso se retorna. Que significa el punto luego del ? => Para ingresar a la propiedad password de la respuesta.  
    else
        return 0; // Como la promesa se resuleve en un numero, en caso de que no se cumpla la condicion se retorna 0, que es lo mismo que retornar un 'false' | 'undefined'.
    // Con la bidireccionalidad puedo regresar el ID del usuario. POR QUE?
    // Porque con el finOne solo buscaria en la tabla de credenciales y necesito una relacion con
    // usuarios para poder acceder tambien a la info de usuarios
});
exports.checkCredentials = checkCredentials;
