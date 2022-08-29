import { Address } from "./address";
import { Locality } from "./locality";
import { Metier } from "./metier";

export class Ouvrier {
    id: number;
    reference: string;
    firstName: string;
    lastName: string;
    sexe: string;
    addressActuel: string;
    disponibity: string;
    selected: boolean;
    email: string;
    phoneOuvrier: string;
    nbreAnneeExperience: number;
    pretentionSalaire: number;
    education: string;
    description: string;
    mobilite: string;
    cvOuvrier: string;
    photoOuvrier: string;
    subject: string;
    message: string;
    dateInscription: Date;
    
    metier: Metier;
    address: Address;
    locality: Locality;

}
