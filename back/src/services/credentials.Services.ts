// Hay que crear credenciales y subirlas a un arreglo simulando base de datos por lo cual hay que importar la interfaz, ya que el tipo de dato
// de esa BDD va a ser la interfaz.

//import ICredential from "../interfaces/ICredential";
import CredentialsDTO from "../DTOs/CreateCredentialsDTO";
import { Credential } from "../entities/Credential";
import { AppDataSource } from "../confing/data-source";


// const credentialsDB: ICredential[] = []; // Aqui ya nos aseguramos el respeto de la estructura que proporciona la interfaz.
// let id = 1; // Luego con el ORM ya se va a generar automaticamente.




const conectionDB = AppDataSource.getRepository(Credential)



const createUserCredentialsServices = async (credential: CredentialsDTO): Promise<Credential> => { // Retorna una promesa que se resuelve en un number.

    const {username, password} = credential; // Desestructuramos la informacion que recibimos.

    const newCredential: Credential = conectionDB.create({
        //id No es necesario porque la base de datos ya la genera.
        username,
        password
    });

    await conectionDB.save(newCredential);

    return newCredential;
}


const checkCredentials = async (credential: CredentialsDTO): Promise<number> => {

    const {username, password} = credential;

    const foundCredential: Credential | null = await conectionDB.findOne(
        {where: {username}, 
        relations: ["user"]} // Si lo encuentra tambien trae la relacion con el usuario.
    ); // Este metodo recorre el arreglo buscando un valor y retornando un booleano con el resultado de busqueda.
                                                                                                                  // cred representa cada objeto del arreglo. Y puede encontrarse un usuario que va a respetar ICredential o no encontrar nada por eso se coloca undefined tambien como tipo de dato.
   if(foundCredential?.password === password) return foundCredential.user.id //NUEVA FORMA DE IF, se consulta y en base a eso se retorna. Que significa el punto luego del ? => Para ingresar a la propiedad password de la respuesta.  
   else return 0; // Como la promesa se resuleve en un numero, en caso de que no se cumpla la condicion se retorna 0, que es lo mismo que retornar un 'false' | 'undefined'.

    // Con la bidireccionalidad puedo regresar el ID del usuario. POR QUE?
    // Porque con el finOne solo buscaria en la tabla de credenciales y necesito una relacion con
    // usuarios para poder acceder tambien a la info de usuarios

}


export {createUserCredentialsServices, checkCredentials};