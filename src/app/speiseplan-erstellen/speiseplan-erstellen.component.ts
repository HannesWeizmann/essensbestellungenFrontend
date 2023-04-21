import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppHttpClient } from '../shared/http-client.service';
import {Day} from 'src/app/dataclass/day';
import { firstValueFrom, Observable , map} from 'rxjs';
import { Gericht } from '../dataclass/gericht';
import { DOCUMENT } from '@angular/common';


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
    @Inject(DOCUMENT) document: Document,
  ) {}

  ngOnInit(): void {
    this.getDays();
    this.getGerichte();

  }


  async navigateBack(){
    this.router.navigate(['/adminportal'])
  }

  checkForSaturday(): Boolean{

    if(this.newDay.date.getDay() ==6){
      if(this.newDay.menu1 != this.defaultgericht || this.newDay.suppe != this.defaultgericht){
        alert("Fehler: Samstags gibt es nur Menü2 und Nachtisch! ");
        this.newDay = new Day(this.defaultdate, this.defaultgericht, this.defaultgericht, this.defaultgericht,this.defaultgericht);
        return false;
      }
      return true;
    }
    return true;
  }

  checkIfExists():Boolean{
    var match = this.days.filter(e=>e.date.toLocaleDateString() == this.newDay.date.toLocaleDateString());
    if(match.length>0){
      alert("Fehler: Dieser Tag exisiert bereits!")
      this.newDay = new Day(this.defaultdate, this.defaultgericht, this.defaultgericht, this.defaultgericht,this.defaultgericht);
      return false;
    }
    return true;
  }

  checkIfPast():Boolean{
    var today = new Date();
    if(this.newDay.date.getTime() < today.getTime()){
      alert("Fehler: Der Tag liegt in der Vergangenheit!");
      this.newDay = new Day(this.defaultdate, this.defaultgericht, this.defaultgericht, this.defaultgericht,this.defaultgericht);
      return false;
    }
    return true;
  }

  async addDay(){
    var transfer: Date = new Date(this.newDay.date);
    this.newDay.date = transfer;
    if(this.checkForSaturday() && this.checkIfExists() && this.checkIfPast()){
      try{
        const result = await firstValueFrom(this.http.post<any>("/day", this.newDay, {withCredentials: true}));
        this.getDays();
        this.newDay = new Day(this.defaultdate, this.defaultgericht, this.defaultgericht, this.defaultgericht,this.defaultgericht);
        this.addVisible = false;
      }catch(error){alert((error as Error).message)}
    }
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
      this.days.sort((a,b)=> a.date.getTime() - b.date.getTime());
    }catch(error){
      this.errorMessage = (error as Error).message;
    }
  }

  setTag(_id: String | undefined){
      this.days.forEach(element => {
          if(element._id == _id){
            this.tag = element;
          }
      });
      this.bearbeitenVisible= true;
      this.addVisible=false;
  }

  async delete(id: string|undefined){
    try {
      const result = await firstValueFrom(this.http.delete('/day/' + id, { withCredentials: true}))
      this.getDays()
      this.bearbeitenVisible=false;
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
    this.tag = new Day(this.defaultdate, this.defaultgericht, this.defaultgericht, this.defaultgericht,this.defaultgericht);
  }

  addAbrechen(){
    this.newDay = new Day(this.defaultdate, this.defaultgericht, this.defaultgericht, this.defaultgericht,this.defaultgericht);
    this.addVisible = false;
  }

}

