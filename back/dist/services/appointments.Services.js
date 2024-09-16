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
exports.cancelAppointmentServices = exports.scheduleAppointmentService = exports.getAppointmentByIdService = exports.getAllAppointmentsService = void 0;
// import IAppointment from "../interfaces/IAppointment";
const data_source_1 = require("../confing/data-source");
const Appointment_1 = require("../entities/Appointment");
const User_1 = require("../entities/User");
const AppointmentStatus_1 = require("../enums/AppointmentStatus");
// const appointmentsDB: IAppointment[] = []; 
// let id: number = 1;
const conectionDB = data_source_1.AppDataSource.getRepository(Appointment_1.Appointment);
const getAllAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const allAppointments = yield conectionDB.find({
        relations: { user: true }
    });
    return allAppointments;
});
exports.getAllAppointmentsService = getAllAppointmentsService;
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundApp = yield conectionDB.findOneBy({ id });
    return foundApp;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const scheduleAppointmentService = (appointmentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, time, userId } = appointmentData;
    const foundUser = yield data_source_1.AppDataSource.getRepository(User_1.User).findOneBy({ id: userId });
    if (foundUser) {
        const newAppointment = conectionDB.create({
            //id No se necesita porque se crea automaticamente.
            date,
            time,
            user: foundUser,
            //status: AppointmentStatus.ACTIVE // Por defecto lo ponemos activo. 
        });
        yield conectionDB.save(newAppointment);
        return newAppointment;
    }
    else {
        return null;
    }
});
exports.scheduleAppointmentService = scheduleAppointmentService;
const cancelAppointmentServices = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //let auxiliar = false // Solucion rapida para validacion.
    const foundApp = yield conectionDB.findOneBy({ id });
    if (foundApp) {
        foundApp.status = AppointmentStatus_1.AppointmentStatus.CANCELLED;
        conectionDB.save(foundApp); // SIEMPRE QUE SE HACE ALGUN CAMBIO EN LA BASE DE DATOS HAY QUE SALVAR LO QUE YA GUARDAMOS. 
        return true;
    }
    else {
        return false;
    }
    // appointmentsDB.forEach((app) => { // El forEach no retorna nada, lo usamos para recorrer y hacer cosas en el recorrido.
    //     if(app.id === id){ 
    //         auxiliar = true
    //         app.status = AppointmentStatus.CANCELLED; // En este caso usamos un if para ver si hay coincidencia con el id y ahi efectuar un cambio en el objeto que representa el appointment.
    // }})
    // if(auxiliar) return "Appointment Cancelled"
    // else return "Appointment Not Found"
});
exports.cancelAppointmentServices = cancelAppointmentServices;
