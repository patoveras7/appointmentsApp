"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_DB = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_PORT = exports.DB_HOST = exports.PORT = void 0;
require("dotenv/config"); // Es lo mismo que antes haciamos con el require.
exports.PORT = process.env.PORT; // Por la naturaleza de este modulo se exporta CADA ELEMENTO del modulo.
exports.DB_HOST = process.env.DB_HOST;
exports.DB_PORT = process.env.DB_PORT;
exports.DB_USERNAME = process.env.DB_USERNAME;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.DB_DB = process.env.DB_DB;
