"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Credential_1 = require("./Credential");
const Appointment_1 = require("./Appointment");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)() // CON ESTE DECORADOR INDICAMOS QUE CADA PROPIEDAD TIENE QUE SER UNA COLUMNA.
    ,
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }) // Colocamos el tipo de dato para que no hay problema en la carga a la base de datos. 
    ,
    __metadata("design:type", Date)
], User.prototype, "birthdate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "nDni", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Credential_1.Credential, (cred) => { cred.user; }) // Cuando hay dos parametros ya esamos hablando de una relacion bidireccional. 
    // Relacionamos primero con Credential y luego con una instancia de Credential que es cred y buscamos al user.
    ,
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Credential_1.Credential // Va a ser del tipo de la entidad credential AL INDICARLE QUE ES UNA RELACION CON OTRA TABLA BUSCA LA 
    // PRIMARI KEY DE OTRA TABLA Y LA COLOCA EN LA COLUMNA. 
    )
], User.prototype, "credential", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Appointment_1.Appointment, (app) => (app.user)) // DOS CALLBACKS NUEVAMENTE: 1) Definimos con que entidad relacionamos. 2) Definimos con que  COLUMNA de la entidad appointment. 
    ,
    __metadata("design:type", Array)
], User.prototype, "appointments", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({
        name: "users" // Con este nombre se va a crear la tabla en la BD.
    }) // Para que TypeORM sepa que lo que sigue es una entidad a partir de lo cual me tiene que crear una tabla arriba se le coloca
    // Entity y para que actue el decorador y le otorgue mayores funcionalidades se le agrega el @. Con todo esto logramos que la clase, en vez 
    // de ser una clase sea una entidad con muchos mas atributos. 
], User);
