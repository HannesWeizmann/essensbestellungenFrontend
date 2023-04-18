import { Component, OnInit } from '@angular/core';
import {Auth} from 'src/app/guards/auth';
import { AppHttpClient } from '../shared/http-client.service';
import { Day } from '../dataclass/day';
import { firstValueFrom, Observable , map} from 'rxjs';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { Gericht } from '../dataclass/gericht';


@Component({
  selector: 'app-speiseplan',
  templateUrl: './speiseplan.component.html',
  styleUrls: ['./speiseplan.component.scss']
})
export class SpeiseplanComponent implements OnInit {

  constructor(private readonly http: AppHttpClient){}

  public days!: Day[];
  defaultdate = new Date();
  defaultgericht = new Gericht("",0,0);
  defaultday: Day = new Day(this.defaultdate, this.defaultgericht, this.defaultgericht, this.defaultgericht,this.defaultgericht);
  monday: Day= this.defaultday;
  tuesday: Day= this.defaultday;
  wendsday: Day= this.defaultday;
  thursday: Day= this.defaultday;
  friday: Day= this.defaultday;
  saturday: Day= this.defaultday;

  today: Date = new Date();
  montag: Date = new Date();
  dienstag: Date = new Date();
  mittwoch: Date = new Date();
  donnerstag: Date = new Date();
  freitag: Date = new Date();
  samstag: Date = new Date();
  sonntag = new Date();

  private auth: Auth = new Auth();
  public username = "";

  async naechsteWoche(){
    this.montag.setDate(this.montag.getDate()+ 7);
    this.dienstag.setDate(this.dienstag.getDate()+ 7);
    this.mittwoch.setDate(this.mittwoch.getDate()+ 7);
    this.donnerstag.setDate(this.donnerstag.getDate()+ 7);
    this.freitag.setDate(this.freitag.getDate()+ 7);
    this.samstag.setDate(this.samstag.getDate()+ 7);
    this.sonntag.setDate(this.sonntag.getDate()+ 7);
    this.matchDays();
  }

  async vorherigeWoche(){
    this.montag.setDate(this.montag.getDate()- 7);
    this.dienstag.setDate(this.dienstag.getDate()- 7);
    this.mittwoch.setDate(this.mittwoch.getDate()- 7);
    this.donnerstag.setDate(this.donnerstag.getDate()- 7);
    this.freitag.setDate(this.freitag.getDate()- 7);
    this.samstag.setDate(this.samstag.getDate()- 7);
    this.sonntag.setDate(this.sonntag.getDate()- 7);
    this.matchDays();
  }

  ngOnInit(): void {

    this.username = this.auth.getUsername();
    this.getMonday();
    this.getDays();

    //this.menu1_montag = this.getGericht('Spaghetti Carbonara');

  }

  async getDays(){
    try {
      this.days = await firstValueFrom(this.http.get<Day[]>("/day/",{ withCredentials: true}));
      //alert(this.days[0].menu1.name);
      this.matchDays();
    } catch (error) {
      alert((error as Error).message)
    }
  }

  matchDays(){
    this.monday = this.defaultday;
    this.tuesday = this.defaultday;
    this.wendsday = this.defaultday;
    this.thursday = this.defaultday;
    this.friday = this.defaultday;
    this.saturday = this.defaultday;
    var date: Date;
    this.days.forEach(element => {
      date = new Date(element.date)
      if(date.toLocaleDateString() == this.montag.toLocaleDateString()){this.monday = element;}
      else if(date.toLocaleDateString() == this.dienstag.toLocaleDateString()){this.tuesday = element;}
      else if(date.toLocaleDateString() == this.mittwoch.toLocaleDateString()){this.wendsday = element;}
      else if(date.toLocaleDateString() == this.donnerstag.toLocaleDateString()){this.thursday = element;}
      else if(date.toLocaleDateString() == this.freitag.toLocaleDateString()){this.friday = element;}
      else if(date.toLocaleDateString() == this.samstag.toLocaleDateString()){this.saturday = element;}
    });
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


  tage = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  selectedTag: string = '';
  selectedMenu: string = '';
  hasNachtisch = false;
  hasSuppe = false;
  isVegetarisch = false;
  submitBestellung() {
    if (!this.selectedTag) {
      alert("Bitte wählen Sie einen Tag aus.");
      return;
    }
    
  // automatisch Menü 2 auswählen und Suppe deaktivieren, wenn Samstag ausgewählt wurde
  if (this.selectedTag === 'Samstag') {
    this.selectedMenu = 'Menü 2';
    this.hasSuppe = false;
  } else if (!this.selectedMenu) {
    alert("Bitte wählen Sie ein Menü aus.");
    return;
  }
    
    // Erstellen eines Bestellungs-Objekts
    const bestellung = {
      tag: this.selectedTag,
      menu: this.selectedMenu || null,
      nachtisch: this.hasNachtisch,
      suppe: this.hasSuppe,
      vegetarisch: this.isVegetarisch
    };
    
    //Code, der die Bestellung an den Server sendet oder lokal speichert
    // ...
  
    // Rücksetzen des Formulars
    this.selectedTag = '';
    this.selectedMenu = '';
    this.hasNachtisch = false;
    this.hasSuppe = false;
    this.isVegetarisch = false;
  
    alert("Ihre Bestellung wurde erfolgreich aufgegeben.");
  }

}
