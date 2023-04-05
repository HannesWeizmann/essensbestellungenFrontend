import {Kategorie} from './kategorie'

export class Gericht{
    name: string;
    preis: number;
    kategorie: Kategorie;

    constructor(name: string, preis: number, kategorie: Kategorie){
        this.name= name;
        this.preis=preis;
        this.kategorie=kategorie;
    }

    
}

