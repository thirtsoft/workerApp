import { Metier } from "./metier";
import { Utilisateur } from "./utilisateur";

export class Annonce {
    id: number;
    reference: string;
	libelle: string;
    lieuPoste: string;
    anneeExperience: string;
    salaire: string;
    emailPoste: string;
    time: string;
    typeContrat: string;
    status: string;
    selected: boolean;
    description: string;
    createdDate: Date;
    dateCloture: Date;

    metier: Metier;
    utilisateur: Utilisateur;

}
