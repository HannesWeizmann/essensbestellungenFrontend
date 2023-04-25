import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppHttpClient } from '../shared/http-client.service';
import { firstValueFrom, Observable , map} from 'rxjs';
import {Overview} from 'src/app/dataclass/overview';

@Component({
  selector: 'app-uebersicht',
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.scss']
})
export class UebersichtComponent {


  constructor(
    private readonly http: AppHttpClient,
    private readonly router: Router){}

    overviews: Overview[] = [];
    detailVisible: Boolean = false;
    overview!: Overview;

    monday: Overview = new Overview();
    tuesday: Overview = new Overview();
    wendsday: Overview = new Overview();
    thursday: Overview = new Overview();
    friday: Overview = new Overview();
    saturday: Overview = new Overview();

    today: Date = new Date();
    montag: Date = new Date();
    dienstag: Date = new Date();
    mittwoch: Date = new Date();
    donnerstag: Date = new Date();
    freitag: Date = new Date();
    samstag: Date = new Date();
    sonntag = new Date();

    async navigateBack(){
      this.router.navigate(['/adminportal'])
    }

    ngOnInit(): void {
      this.getMonday();
      this.getOverviews();
    }

    async getOverviews(){
      try {
        this.overviews = await firstValueFrom(this.http.get<Overview[]>("/bestellung/overview",{ withCredentials: true} ));
        let transfer: Date |undefined;
        this.overviews.forEach(element => {
          transfer = new Date(element.date);
          element.date = transfer;
        });
        this.overviews.sort((a,b)=> a.date.getTime() - b.date.getTime());
        this.matchDay();
      } catch (error) {
        alert((error as Error).message);
      }
    }

    showDetail(date :Date){
        this.overviews.forEach(element => {
          if(element.date.toLocaleDateString() == date.toLocaleDateString()){
            this.overview = element;
          }
        });
        this.detailVisible =true;
    }

    getMonday(){
      var day = this.today.getDay();
      var diff = this.today.getDate() - day + (day == 0 ? -6:1);
      this.montag.setDate(diff);
      this.dienstag.setDate(this.montag.getDate()+ 1);
      this.mittwoch.setDate(this.montag.getDate()+ 2);
      this.donnerstag.setDate(this.montag.getDate()+ 3);
      this.freitag.setDate(this.montag.getDate()+ 4);
      this.samstag.setDate(this.montag.getDate()+ 5);
      this.sonntag.setDate(this.montag.getDate()+ 6);
    }

    async naechsteWoche(){
      this.montag.setDate(this.montag.getDate()+ 7);
      this.dienstag.setDate(this.dienstag.getDate()+ 7);
      this.mittwoch.setDate(this.mittwoch.getDate()+ 7);
      this.donnerstag.setDate(this.donnerstag.getDate()+ 7);
      this.freitag.setDate(this.freitag.getDate()+ 7);
      this.samstag.setDate(this.samstag.getDate()+ 7);
      this.sonntag.setDate(this.sonntag.getDate()+ 7);
      this.matchDay();
    }
  
    async vorherigeWoche(){
      this.montag.setDate(this.montag.getDate()- 7);
      this.dienstag.setDate(this.dienstag.getDate()- 7);
      this.mittwoch.setDate(this.mittwoch.getDate()- 7);
      this.donnerstag.setDate(this.donnerstag.getDate()- 7);
      this.freitag.setDate(this.freitag.getDate()- 7);
      this.samstag.setDate(this.samstag.getDate()- 7);
      this.sonntag.setDate(this.sonntag.getDate()- 7);
      this.matchDay();
    }

    matchDay(){
      this.monday = new Overview();
      this.tuesday = new Overview();
      this.wendsday = new Overview();
      this.thursday = new Overview();
      this.friday = new Overview();
      this.saturday = new Overview();

      this.overviews.forEach(element => {
        if(element.date.toLocaleDateString() == this.montag.toLocaleDateString()){this.monday = element}
        else if(element.date.toLocaleDateString() == this.dienstag.toLocaleDateString()){this.tuesday = element}
        else if(element.date.toLocaleDateString() == this.mittwoch.toLocaleDateString()){this.wendsday = element}
        else if(element.date.toLocaleDateString() == this.donnerstag.toLocaleDateString()){this.thursday = element}
        else if(element.date.toLocaleDateString() == this.freitag.toLocaleDateString()){this.friday = element}
        else if(element.date.toLocaleDateString() == this.samstag.toLocaleDateString()){this.saturday = element}

      });
    }
}
