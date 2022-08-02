import { Ouvrier } from "./ouvrier";

export class Prestation {
    id: number;
    title: string;
    description: string;
    createdDate: Date;
    
    ouvrier: Ouvrier;
}
