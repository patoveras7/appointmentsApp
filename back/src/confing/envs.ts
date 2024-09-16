import "dotenv/config"; // Es lo mismo que antes haciamos con el require.

export const PORT = process.env.PORT; // Por la naturaleza de este modulo se exporta CADA ELEMENTO del modulo.

export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DB = process.env.DB_DB;
