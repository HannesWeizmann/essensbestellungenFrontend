import {Gericht} from './gericht'

export class Day{

    datum: Date;
    menu1: Gericht;
    menu2: Gericht;
    nachtisch: Gericht;
    suppe: Gericht;

    constructor(datum:Date, menu1:Gericht, menu2:Gericht, nachtisch:Gericht, suppe:Gericht){
        this.datum=datum;
        this.menu1=menu1;
        this.menu2=menu2;
        this.nachtisch=nachtisch;
        this.suppe=suppe;
    }
}