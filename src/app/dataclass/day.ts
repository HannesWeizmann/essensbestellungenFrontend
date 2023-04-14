import {Gericht} from './gericht'

export class Day{
    _id: string | undefined;
    date: Date;
    menu1: Gericht;
    menu2: Gericht;
    nachtisch: Gericht;
    suppe: Gericht;
    __v: Number | undefined;

    constructor( date:Date, menu1:Gericht, menu2:Gericht, nachtisch:Gericht, suppe:Gericht){
        this.date=date;
        this.menu1=menu1;
        this.menu2=menu2;
        this.nachtisch=nachtisch;
        this.suppe=suppe;
    }
  
}