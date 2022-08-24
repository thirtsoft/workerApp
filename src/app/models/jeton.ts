import { Utilisateur } from "./utilisateur";

export class Jeton {
    id: number;
    numero: number;
    montant: number;
	etat: string;
    createDate: Date;

    utilisateur: Utilisateur;

}
