"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // 'express' es por convencion para traer todo lo que hacer por detras express para levantar el servidor,
// en realidad puede llamar de cualquier forma. Y Express es una interfaz, es un tipo de dato que yo le voy a dar a mi servidor.
const principalRouter_1 = __importDefault(require("./routes/principalRouter"));
require("reflect-metadata");
const morgan_1 = __importDefault(require("morgan"));
const server = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
server.use(express_1.default.json()); // Como la trasnferencia de datos opera en json inyectamos json a la app. 
server.use((0, cors_1.default)());
server.use((0, morgan_1.default)('dev'));
server.use(principalRouter_1.default); // La request va al router principal quien la redirecciona.
// Si uno quisiera podria ir armando el camino de la ruta agregando por ejemplo /api o /carritodecompra, antes de pasar al globalRouter.
exports.default = server; // Default cuando se exporta todo a vez (todo el codigo se anida y se exporta). 
// Por eso cuando se exporta por default se puede importar con cualquier nombre en otro modulo. PERO cuando exportmos en forma de 
// objeto SI se tiene que respetar el nombre.
