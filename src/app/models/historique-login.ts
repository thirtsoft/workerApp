import { Utilisateur } from "./utilisateur";

export class HistoriqueLogin {
    id: number;
    action: string;
    createDate: Date;

    utilisateur: Utilisateur;
}
