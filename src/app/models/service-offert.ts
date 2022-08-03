import { Ouvrier } from "./ouvrier";

export class ServiceOffert {
    id: number;
    reference: string;
    designation: string;
    description: string;
    
    ouvrier: Ouvrier;

}
