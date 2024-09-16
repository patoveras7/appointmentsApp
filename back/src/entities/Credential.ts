import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity({
    name : "credentials"
})
export class Credential {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @OneToOne(() => User, (user) => user.credential) // Para especificar la relacion bidireccional hacemos lo mismo quie en User. 
    user: User // user con minuscula es la columna.


}