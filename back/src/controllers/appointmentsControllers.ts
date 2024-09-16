import { Request, Response } from "express"
import { cancelAppointmentServices, getAllAppointmentsService, getAppointmentByIdService, scheduleAppointmentService } from "../services/appointments.Services"
import { error } from "console";
// Declaramos las funciones y las exporamos para importarlas desde las rutas.

const getAllAppointments = async (req: Request, res: Response) => {
// Cuando pasamos por parametro TS no tiene ninguna referencia para "deducir" el tipo de dato, por lo tanto siempre hay que consignarlo.    
try {
const AllAppointments = await getAllAppointmentsService();
return AllAppointments.length? res.status(200).json(AllAppointments) : res.status(404).json({message: "No hay turnos registrados"})
} catch (error) {
    res.status(500).json({message: error})     
}
}
const getAppointmentDetails = async (req: Request, res: Response) => {

try {

const {id} = req.params;// Cuando llega por body podemos ponerle que sea un numero o un string, pero cuando llega por parametro siempre es un string.

const appointmentDetails = await getAppointmentByIdService(+id)
return appointmentDetails? res.status(200).json(appointmentDetails) : res.status(404).json({error: "El turno solicitado no existe"}) 
} catch (error) {
res.status(500).json({message: error})    
}


}

const createNewAppointment = async (req: Request, res: Response) => {
    
try {
        

const {date, time, userId} = req.body;

if(!date || !time || !userId){
return res.status(404).json({error: "Los datos ingresados son  incorrectos o faltantes. Intente nuevamente."})    
} else {
const newAppointment = await scheduleAppointmentService({date, time, userId})
console.log(newAppointment);
res.status(201).json(newAppointment)   
}
}catch (error) {
res.status(500).json({message: error})    
}    
    
}

const cancelAppointment = async (req: Request, res: Response) => {
const {id} = req.params;
try {
const result = await cancelAppointmentServices(+id);
return result? res.status(200).json({message: `${result} Turno cancelado correctamente`}) : res.status(404).json({error: "No se pudo cancelar el turno"})
} catch (error) {
res.status(500).json({message: error})        
}
}

// Tambien existe la posibilidad de exportar consignando 'export' al lado de cada const.
export { getAllAppointments, getAppointmentDetails, createNewAppointment, cancelAppointment }
