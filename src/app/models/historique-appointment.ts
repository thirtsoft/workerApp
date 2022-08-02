import { Appointment } from "./appointment";

export class HistoriqueAppointment {
    id: number;
    action: string;
    createdDate: Date;
    
    appointment: Appointment;
}
