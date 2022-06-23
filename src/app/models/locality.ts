import { Address } from "./address";

export class Locality {
    id: number;
    name: string;
    rue: string;
	codePostal: string;
    subject: string; 
    dataCreate: Date;
    dataUpdate: Date;

    address: Address;


}
