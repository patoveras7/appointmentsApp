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
exports.cancelAppointment = exports.createNewAppointment = exports.getAppointmentDetails = exports.getAllAppointments = void 0;
const appointments_Services_1 = require("../services/appointments.Services");
// Declaramos las funciones y las exporamos para importarlas desde las rutas.
const getAllAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Cuando pasamos por parametro TS no tiene ninguna referencia para "deducir" el tipo de dato, por lo tanto siempre hay que consignarlo.    
    try {
        const AllAppointments = yield (0, appointments_Services_1.getAllAppointmentsService)();
        return AllAppointments.length ? res.status(200).json(AllAppointments) : res.status(404).json({ message: "No hay turnos registrados" });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getAllAppointments = getAllAppointments;
const getAppointmentDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Cuando llega por body podemos ponerle que sea un numero o un string, pero cuando llega por parametro siempre es un string.
        const appointmentDetails = yield (0, appointments_Services_1.getAppointmentByIdService)(+id);
        return appointmentDetails ? res.status(200).json(appointmentDetails) : res.status(404).json({ error: "El turno solicitado no existe" });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getAppointmentDetails = getAppointmentDetails;
const createNewAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, time, userId } = req.body;
        if (!date || !time || !userId) {
            return res.status(404).json({ error: "Los datos ingresados son  incorrectos o faltantes. Intente nuevamente." });
        }
        else {
            const newAppointment = yield (0, appointments_Services_1.scheduleAppointmentService)({ date, time, userId });
            console.log(newAppointment);
            res.status(201).json(newAppointment);
        }
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createNewAppointment = createNewAppointment;
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield (0, appointments_Services_1.cancelAppointmentServices)(+id);
        return result ? res.status(200).json({ message: `${result} Turno cancelado correctamente` }) : res.status(404).json({ error: "No se pudo cancelar el turno" });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.cancelAppointment = cancelAppointment;
