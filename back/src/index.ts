import server from "./server";
import { PORT } from "./confing/envs";
import { initializationDbConnetion } from "./confing/data-source";


// Optamos por conectar a la DB desde otro lado e importar la conexión para que no haya problema si hay algun error en la conexión o el levantamineto del servidor.-}


// AppDataSource.initialize()
// .then(() => {
//     console.log("DB connected");
//     server.listen(PORT, () => console.log(`Server running on port ${PORT}`));    
// })
// . catch((error) => console.log(error));

try {    
    server.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`); 
    await initializationDbConnetion();
    });
} catch (error) {
    console.log(error);    
};


