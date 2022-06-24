import { Utilisateur } from "./utilisateur";

export class Jeton {
    id: number;
    montant: number;
	etat: string;
    createDate: Date;

    utilisateur: Utilisateur;

}
