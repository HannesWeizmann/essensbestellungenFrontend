import { Gericht } from './gericht';

export class Bestellung{
    _id: string | undefined;
    date: Date;
    username: String;
    menu1: Gericht | undefined;
    menu2: Gericht | undefined;
    nachtisch: Gericht | undefined;
    suppe: Gericht | undefined;
    vegetarisch: Boolean;
    kosten: Number;
    __v: Number | undefined;

    constructor(date:Date,username: String , vegetarisch: Boolean, kosten: Number){
        this.date=date;
        this.username=username;
        this.vegetarisch=vegetarisch;
        this.kosten=kosten;
    }
}