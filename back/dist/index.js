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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const envs_1 = require("./confing/envs");
const data_source_1 = require("./confing/data-source");
// Optamos por conectar a la DB desde otro lado e importar la conexión para que no haya problema si hay algun error en la conexión o el levantamineto del servidor.-}
// AppDataSource.initialize()
// .then(() => {
//     console.log("DB connected");
//     server.listen(PORT, () => console.log(`Server running on port ${PORT}`));    
// })
// . catch((error) => console.log(error));
try {
    server_1.default.listen(envs_1.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Server running on port ${envs_1.PORT}`);
        yield (0, data_source_1.initializationDbConnetion)();
    }));
}
catch (error) {
    console.log(error);
}
;
