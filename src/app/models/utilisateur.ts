import { Role } from "./role";

export class Utilisateur {
    id: number;
    name: string;
    username: string;
    mobile: string;
    email: string;
    photo: string = "avatar.jpg";
    nomEntreprise: string;
    website: string;
    secteurActivite: string;
    addressRecruteur: string;
    villeRecruteur: string;
    information: string;
    password: string;
    subject: string;
    message: string;
    isActive: boolean
    dateInscription: Date;

    roles: Role[];

}
