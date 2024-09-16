// import IAppointment from "../interfaces/IAppointment";
import { AppDataSource } from "../confing/data-source";
import AppointmentDTO from "../DTOs/AppointmentDTO";
import { Appointment } from "../entities/Appointment";
import { User } from "../entities/User";
import { AppointmentStatus } from "../enums/AppointmentStatus";

// const appointmentsDB: IAppointment[] = []; 
// let id: number = 1;



const conectionDB = AppDataSource.getRepository(Appointment)



const getAllAppointmentsService = async (): Promise<Appointment[]> => {
 
const allAppointments: Appointment[] = await conectionDB.find({
    relations: {user:true}}); 
    return allAppointments;   
}

const getAppointmentByIdService = async (id: number): Promise<Appointment | null> => {

    const foundApp = await conectionDB.findOneBy({id});

    return foundApp;
}

const scheduleAppointmentService = async (appointmentData: AppointmentDTO): Promise<Appointment | null> => {

    const {date, time, userId} = appointmentData;

    const foundUser: User | null = await AppDataSource.getRepository(User).findOneBy({id: userId})

    if(foundUser){
    const newAppointment: Appointment =  conectionDB.create({
            
            //id No se necesita porque se crea automaticamente.
            date,
            time,
            user: foundUser,
            //status: AppointmentStatus.ACTIVE // Por defecto lo ponemos activo. 
             
    })
    await conectionDB.save(newAppointment);
    
    return newAppointment;
    }else{
       
        return null

    }  

 

}

const cancelAppointmentServices = async (id:number): Promise<boolean> => {

//let auxiliar = false // Solucion rapida para validacion.


const foundApp: Appointment | null = await conectionDB.findOneBy({id});

if(foundApp){
  foundApp.status = AppointmentStatus.CANCELLED
  conectionDB.save(foundApp) // SIEMPRE QUE SE HACE ALGUN CAMBIO EN LA BASE DE DATOS HAY QUE SALVAR LO QUE YA GUARDAMOS. 
  return true  
} else{
  return false  
}


// appointmentsDB.forEach((app) => { // El forEach no retorna nada, lo usamos para recorrer y hacer cosas en el recorrido.
//     if(app.id === id){ 
//         auxiliar = true
//         app.status = AppointmentStatus.CANCELLED; // En este caso usamos un if para ver si hay coincidencia con el id y ahi efectuar un cambio en el objeto que representa el appointment.

// }})

// if(auxiliar) return "Appointment Cancelled"
// else return "Appointment Not Found"

}

export {getAllAppointmentsService, getAppointmentByIdService, scheduleAppointmentService, cancelAppointmentServices}