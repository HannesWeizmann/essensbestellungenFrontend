import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppHttpClient } from '../shared/http-client.service';
import {Day} from 'src/app/dataclass/day';
import { firstValueFrom, Observable , map} from 'rxjs';
import { Gericht } from '../dataclass/gericht';


@Component({
  selector: 'app-speiseplan-erstellen',
  templateUrl: './speiseplan-erstellen.component.html',
  styleUrls: ['./speiseplan-erstellen.component.scss']
})
export class SpeiseplanErstellenComponent {

  errorMessage: string = "";
  public days!: Day[] ;
  defaultdate = new Date();
  defaultgericht = new Gericht("",0,0);
  public tag!: Day;
  public bearbeitenVisible: Boolean = false;
  public addVisible: Boolean = false;
  newDay: Day  = new Day(this.defaultdate, this.defaultgericht, this.defaultgericht, this.defaultgericht,this.defaultgericht);
  public gerichte: Gericht[] = [];
  menus: Gericht[] = [];
  suppen:  Gericht[] = [];
  nachtische:  Gericht[]  = [];

  constructor(
    private readonly http: AppHttpClient,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.getDays();
    this.getGerichte();

  }


  async navigateBack(){
    this.router.navigate(['/adminportal'])
  }

  async addDay(){
    try{
      const result = await firstValueFrom(this.http.post<any>("/day", this.newDay, {withCredentials: true}));
      this.getDays();
      this.newDay = new Day(this.defaultdate, this.defaultgericht, this.defaultgericht, this.defaultgericht,this.defaultgericht);
      this.addVisible = false;
    }catch(error){alert((error as Error).message)}
  }

  async getDays(){
    try{
      this.days = await firstValueFrom(this.http.get<Day[]>("/day/",{ withCredentials: true}));
      this.defaultdate= this.days[0].date;
      this.tag = new Day ( this.defaultdate, this.defaultgericht, this.defaultgericht, this.defaultgericht, this.defaultgericht);
      //
      let transfer: Date | undefined;
      this.days.forEach(element => {
        transfer = new Date(element.date);
        element.date = transfer;
      });
      //let test: Date = new Date(this.days[1].date)
      //alert(test)
      //
      this.days.sort((a,b)=> a.date.getTime() - b.date.getTime());
    }catch(error){
      this.errorMessage = (error as Error).message;
    }
  }

  setTag(date: Date){
      this.days.forEach(element => {
          if(element.date == date){
            this.tag = element;
          }
      });
  }

  async delete(id: string|undefined){
    try {
      const result = await firstValueFrom(this.http.delete('/day/' + id, { withCredentials: true}))
      this.getDays()
    } catch (error) {
      alert((error as Error).message)
    }
  }

  async getGerichte(){
    try{
      this.gerichte = await firstValueFrom(this.http.get<Gericht[]>('/gericht', { withCredentials: true}))
      this.gerichte.forEach((element: any) => {
        if(element.kategorie ==0){
          this.menus.push(element);
        }
        else if (element.kategorie ==1){
          this.nachtische.push(element);
        }
        else if(element.kategorie ==2){
          this.suppen.push(element);
        }

      });
    }catch(error){
      this.errorMessage = (error as Error).message;    }
  }

  makeAddVisible(){
    this.bearbeitenVisible = false;
    this.addVisible = true;
  }

}

