import express, {Express} from "express"; // 'express' es por convencion para traer todo lo que hacer por detras express para levantar el servidor,
// en realidad puede llamar de cualquier forma. Y Express es una interfaz, es un tipo de dato que yo le voy a dar a mi servidor.
import globalRouter from "./routes/principalRouter";
import 'reflect-metadata';
import morgan from 'morgan';
const server: Express = express();
import cors from 'cors';


server.use(express.json()); // Como la trasnferencia de datos opera en json inyectamos json a la app. 
server.use(cors());
server.use(morgan('dev'));
server.use(globalRouter)// La request va al router principal quien la redirecciona.
// Si uno quisiera podria ir armando el camino de la ruta agregando por ejemplo /api o /carritodecompra, antes de pasar al globalRouter.
export default server; // Default cuando se exporta todo a vez (todo el codigo se anida y se exporta). 
// Por eso cuando se exporta por default se puede importar con cualquier nombre en otro modulo. PERO cuando exportmos en forma de 
// objeto SI se tiene que respetar el nombre.