import { Time } from "@angular/common";
import { Ouvrier } from "./ouvrier";
import { Utilisateur } from "./utilisateur";

export class Appointment {
    id: number;
    reference: string;
    createdDate: Date;
    appDate: Date;
    appointmentDate: Date;
    time: Time
    statusOfAppointment: string;
    description: string;

    ouvrier: Ouvrier;
    utilisateur: Utilisateur;

}
