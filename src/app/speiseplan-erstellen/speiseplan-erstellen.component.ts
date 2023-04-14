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


  //public days1: Observable<Day[]> | undefined;
  public days!: Day[] ;

  defaultdate = new Date();
  defaultgericht = new Gericht("",0,0);
  //public tag: Day = new Day(this.defaultdate, this.defaultgericht, this.defaultgericht, this.defaultgericht, this.defaultgericht);
  public tag!: Day;

  constructor(
    private readonly http: AppHttpClient,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.getDays();
  }

  async addDay(){
    try{
      //const result = await firstValueFrom(this.http.post<any>("localhost:3000/day", this.newDay, {withCredentials: true}))
      //salert(result)
      
      
    }catch(error)
    {
        alert((error as Error).message)
    }
  }

  async getDays(){
    try{
      //this.days= this.http.get<Day[]>("day/",{ withCredentials: true}).pipe(map(data=> data));
      this.days = await firstValueFrom(this.http.get<Day[]>("/day/",{ withCredentials: true}));
      this.defaultdate= this.days[0].date;
      this.tag = new Day ( this.defaultdate, this.defaultgericht, this.defaultgericht, this.defaultgericht, this.defaultgericht);
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


}

