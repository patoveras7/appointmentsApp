import { Request, Response } from "express"
import { createUserServices, getAllUsersServices, getUserByIdServices } from "../services/users.Services"
import { error } from "console"
import { checkCredentials } from "../services/credentials.Services"
// Declaramos las funciones y las exporamos para importarlas desde las rutas.

const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    
// Cuando pasamos por parametro TS no tiene ninguna referencia para "deducir" el tipo de dato, por lo tanto siempre hay que consignarlo.    
try {
    const allUsers = await getAllUsersServices()
    //Pasamos ERRORES CONTROLADOS
    return allUsers.length? res.status(200).json(allUsers) : res.status(404).json({message: "No hay usuarios registrados"})
} catch (error) {
    // Pasamos ERRORES NO CONTROLADOS
    return res.status(500).json(error); 
}


}

const getUserById = async (req: Request, res: Response): Promise<Response> => {

try {
    
const {id} = req.params;    

const userById = await getUserByIdServices(+id); // TODO LO QUE VIENE POR PARAMETRO VIENE EN STRING Y GUARDA!! PORQUE JS NO AVISA DE ESO, ENTONCES SI 
// LO QUE VIENE EN STRING NECESITAMOS CONVERTIRLO A NUMERO LE PONEMOS UN + ADELANTE (ESA ES SOLO UNA OPCION).    
return userById? res.status(200).json(userById) : res.status(404).json({error: "El usuario solicitado no existe"})
} catch (error) {
    return res.status(500).json(error);    
}}


const registerNewUser = async (req: Request, res: Response): Promise<Response> => {

try {

const {name, email, birthdate, nDni, username, password} = req.body     

if(!name || !email || !birthdate || !nDni || !username || !password) 
return res.status(400).json({error: "Todos los campos son obligatorios"}) // El return corta la ejecucion y envia una respuesta (Buena practica poner return). La unica forma de no preocuparse por el return es poner un middleware.

const newUser = await createUserServices({name, email, birthdate, nDni, username, password}) // Se puede pasar req.body pero es conveniente pasar distractoring. 

return newUser? res.status(201).json(newUser) : res.status(400).json({error: "No fue posible crear el usuario."})

} catch (error) {
    
    return res.status(500).json(error);       

}}


const loginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
       
       const {username, password} = req.body; 
       const loginUser = await checkCredentials({username, password});
       
        if(loginUser){
        const user = await getUserByIdServices(loginUser);    
        return res. status(200).json({login: "true", user})
       } else{
        return res.status(400).json({error: "Credenciales incorrectas"})
      }  


    } catch (error) {
        return res.status(500).json(error);   
    }


}



// Tambien existe la posibilidad de exportar consignando 'export' al lado de cada const.
export { getAllUsers, getUserById, registerNewUser, loginUser }

























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

