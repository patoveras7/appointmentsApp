import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Credential } from "./Credential"
import { Appointment } from "./Appointment"

@Entity({
    name: "users"// Con este nombre se va a crear la tabla en la BD.
}) // Para que TypeORM sepa que lo que sigue es una entidad a partir de lo cual me tiene que crear una tabla arriba se le coloca
// Entity y para que actue el decorador y le otorgue mayores funcionalidades se le agrega el @. Con todo esto logramos que la clase, en vez 
// de ser una clase sea una entidad con muchos mas atributos. 
export class User {

    // ESTAS VA A SER NUESTRA TABLA, CADA PROPIEDAD ES UNA COLUMNA. 

    @PrimaryGeneratedColumn() // CON ESTE DECORADOR INDICAMOS QUE CADA PROPIEDAD TIENE QUE SER UNA COLUMNA.
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column({type: "date"}) // Colocamos el tipo de dato para que no hay problema en la carga a la base de datos. 
    birthdate: Date

    @Column()
    nDni: number


    // Si la relacion es unidireccional basta con el ONE TO ONE y el JOIN COLUMN aqui, nada mas.

    // Para las credenciales tenemos que crear una columna que es una relacion con otra tabla (por eso importamos la clase/entidad).
    // Para que haga la relacion con la tabla Credential, necesitamos el JoinColumn y el OneToOne.
    @OneToOne(() => Credential, (cred)=> {cred.user}) // Cuando hay dos parametros ya esamos hablando de una relacion bidireccional. 
    // Relacionamos primero con Credential y luego con una instancia de Credential que es cred y buscamos al user.
    @JoinColumn() 
    credential: Credential // Va a ser del tipo de la entidad credential AL INDICARLE QUE ES UNA RELACION CON OTRA TABLA BUSCA LA 
    // PRIMARI KEY DE OTRA TABLA Y LA COLOCA EN LA COLUMNA. 




    @OneToMany(()=> Appointment, (app)=> (app.user)) // DOS CALLBACKS NUEVAMENTE: 1) Definimos con que entidad relacionamos. 2) Definimos con que  COLUMNA de la entidad appointment. 
    appointments: Appointment[] // Array porque puede tener muchos.




}

