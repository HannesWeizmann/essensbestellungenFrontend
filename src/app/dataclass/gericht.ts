import {Kategorie} from './kategorie'

export class Gericht{
    id: string | undefined;
    name: string;
    preis: number;
    kategorie: Kategorie;

    constructor(name: string, preis: number, kategorie: Kategorie){
        this.name= name;
        this.preis=preis;
        this.kategorie=kategorie;
    }

    
}

