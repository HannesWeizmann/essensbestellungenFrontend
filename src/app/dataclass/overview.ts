export class Overview{
    date: Date;
    menu1Count: number;
    menu2Count: number;
    menu2VegCount: number;
    nachtischCount: number;
    suppeCount: number;

    constructor(){
        this.date = new Date();
        this.menu1Count = 0;
        this.menu2Count =0;
        this.menu2VegCount =0;
        this.nachtischCount =0;
        this.suppeCount =0;
    }
}