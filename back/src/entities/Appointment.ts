import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { AppointmentStatus } from "../enums/AppointmentStatus"
import { User } from "./User";
@Entity({
    name: "appointments"
})
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "date"})
    date: Date;
    @Column({type: "time"})
    time: string;
    @Column({
        type: "enum",
        enum: AppointmentStatus,
        default: AppointmentStatus.ACTIVE // Por defecto lo ponemos activo.
    })
    status: AppointmentStatus;

    @ManyToOne(()=> User, (user) => (user.appointments))
    user: User

}
