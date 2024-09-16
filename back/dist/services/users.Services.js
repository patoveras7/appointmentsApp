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
exports.createUserServices = exports.getUserByIdServices = exports.getAllUsersServices = void 0;
const credentials_Services_1 = require("./credentials.Services");
const User_1 = require("../entities/User"); // Ahora como ya trabajamos con la base de datos no vamos a tener mas un array de interfaces de Usuarios sino 
// que vamos a tener un array de entidades, por eso importamos la entidad.
const data_source_1 = require("../confing/data-source");
// const usersDB: IUser[] = []; 
// let id = 1;
const conectionDB = data_source_1.AppDataSource.getRepository(User_1.User); // Para hacer la concección a la base de datos se tiene que importar el ORM y obtener el repositorio de la entidad Usuario. 
// Lo guardamos en una variable para que sea mas comodo. VER SI SE MODULARIZA.                   
const getAllUsersServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield conectionDB.find(// El ORM nos va a traer todos los registros de la tabla.
    {
        relations: { credential: true, appointments: true }
    } // Con el find traeria TODO, pero podemos especificar algun parametro dentro del find. En este caso con la propiedad RELATIONS solicitamos 
    // que nos traiga cierta informacion RELACIONADA con la informacion del usuario. La relacion con credentials => TRUE, traemela.
    );
    return users;
});
exports.getAllUsersServices = getAllUsersServices;
const getUserByIdServices = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const foundUser: User | undefined = usersDB.find(user => user.id === id); // Find es un metodo que recorre el arreglo y APENAS encuentra una coincidencia corta el rorrido y retorna el match.
    // En realidad el find retorna un valor encontrado o undefined (que podria traducirse en booleanos).   
    return yield conectionDB.findOne({ where: { id }, relations: ["appointments"] }); //FindByOne tambien es una opcion. Hay que tener en cuenta que en
    // findOne a diferencia del find en cuanto a las relaciones hay que pasar un array e informar en formato string. 
});
exports.getUserByIdServices = getUserByIdServices;
const createUserServices = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // Usamos el DTO porque la info que nos va a llegar es medianamente distinta al User.    
    try {
        const { name, email, birthdate, nDni, username, password } = userData;
        const newCredentials = yield (0, credentials_Services_1.createUserCredentialsServices)({ username, password }); // Antes de crear el usuario necesitamos crear las credenciales primero. Y como usamos DTO en la creacion de credenciales
        // le pasamos los paremtros de usuario y contraseña en forma desestructurada porque estaria esperando UN PARAMETRO solamente que seria el credentials.                    
        // Como USER esta relacionado con TODA LA ENTIDAD CREDENTIAL y NO con su ID solamente tenemos que modificar la funcion del servicio de credenciales para que
        // devuelve toda la entidad.  
        // Cuando hacemos un create en una base de  datos hay que salvarlo en cada lado donde se modifica. 
        // await AppDataSource.getRepository(Credential).save(newCredentials);
        const newUser = conectionDB.create({
            // El ID YA NO SE NECESITA PORQUE LO CREA EL ORM.
            name,
            email,
            birthdate,
            nDni,
            credential: newCredentials
        });
        // Como tenemos una bidireccionalidad hay que marcarla sino va a tirar error. Hay que marcar la relacion de la columna USER en LA ENTIDAD CREDENTIAL. 
        newCredentials.user = newUser; // Marco la relacion para ambos lados.
        //await AppDataSource.getRepository(Credential).save(newCredentials);
        yield conectionDB.save(newUser);
        return newUser;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.createUserServices = createUserServices;
