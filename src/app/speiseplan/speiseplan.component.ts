import { Component, OnInit } from '@angular/core';
import {Auth} from 'src/app/guards/auth';
import { AppHttpClient } from '../shared/http-client.service';
import { Day } from '../dataclass/day';
import { firstValueFrom, Observable , map} from 'rxjs';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { Gericht } from '../dataclass/gericht';
import {Bestellung} from 'src/app/dataclass/bestellung';


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

  defaultBestellung: Bestellung = new Bestellung(this.defaultdate, "", false, 0);
  newBestellung: Bestellung = this.defaultBestellung;

  private auth: Auth = new Auth();
  public username = "";

  tage = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  selectedTag: string = '';
  selectedMenu: string = '';
  hasNachtisch = false;
  hasSuppe = false;
  isVegetarisch = false;
  kosten  = 0;

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




  async submitBestellung() {
    

    if (!this.selectedTag) {
      alert("Bitte wählen Sie einen Tag aus.");
      return;
    }
    if (!this.selectedMenu) {
      alert("Bitte wählen Sie ein Menü aus.");
      return;
    }
    this.kostenBerechnen();
    this.newBestellung.kosten = this.kosten;
    //Code, der die Bestellung an den Server sendet oder lokal speichert
    // ...
    try {
      const result = await firstValueFrom(this.http.post<any>("/bestellung", this.newBestellung,{withCredentials:true}));
    } catch (error) {
      alert((error as Error).message)
    }
  
    // Rücksetzen des Formulars
    this.selectedTag = '';
    this.selectedMenu = '';
    this.hasNachtisch = false;
    this.hasSuppe = false;
    this.isVegetarisch = false;
  
    alert("Ihre Bestellung wurde erfolgreich aufgegeben.");
  }

  createBestellung(){
    this.newBestellung.username = this.username;
    if(!this.selectedTag){}
    else if(this.selectedTag =='Montag'){
      this.newBestellung.date = this.monday.date;
      if(this.selectedMenu=='Menü 1'){
        this.newBestellung.menu1 = this.monday.menu1;
      }
      else{
        this.newBestellung.menu2 = this.monday.menu2;
      }
      if(this.hasNachtisch== true){
        this.newBestellung.nachtisch= this.monday.nachtisch;
      }
      if(this.hasSuppe==true){
        this.newBestellung.suppe = this.monday.suppe;
      }
    }
    else if(this.selectedTag =='Dienstag'){
      this.newBestellung.date = this.tuesday.date;
      if(this.selectedMenu=='Menü 1'){
        this.newBestellung.menu1 = this.tuesday.menu1;
      }
      else{
        this.newBestellung.menu2 = this.tuesday.menu2;
      }
      if(this.hasNachtisch== true){
        this.newBestellung.nachtisch= this.tuesday.nachtisch;
      }
      if(this.hasSuppe==true){
        this.newBestellung.suppe = this.tuesday.suppe;
      }
    }
    else if(this.selectedTag =='Mittwoch'){
      this.newBestellung.date = this.wendsday.date;
      if(this.selectedMenu=='Menü 1'){
        this.newBestellung.menu1 = this.wendsday.menu1;
      }
      else{
        this.newBestellung.menu2 = this.wendsday.menu2;
      }
      if(this.hasNachtisch== true){
        this.newBestellung.nachtisch= this.wendsday.nachtisch;
      }
      if(this.hasSuppe==true){
        this.newBestellung.suppe = this.wendsday.suppe;
      }
    }
    else if(this.selectedTag =='Donnerstag'){
      this.newBestellung.date = this.thursday.date;
      if(this.selectedMenu=='Menü 1'){
        this.newBestellung.menu1 = this.thursday.menu1;
      }
      else{
        this.newBestellung.menu2 = this.thursday.menu2;
      }
      if(this.hasNachtisch== true){
        this.newBestellung.nachtisch= this.thursday.nachtisch;
      }
      if(this.hasSuppe==true){
        this.newBestellung.suppe = this.thursday.suppe;
      }
    }
    else if(this.selectedTag =='Freitag'){
      this.newBestellung.date = this.friday.date;
      if(this.selectedMenu=='Menü 1'){
        this.newBestellung.menu1 = this.friday.menu1;
      }
      else{
        this.newBestellung.menu2 = this.friday.menu2;
      }
      if(this.hasNachtisch== true){
        this.newBestellung.nachtisch= this.friday.nachtisch;
      }
      if(this.hasSuppe==true){
        this.newBestellung.suppe = this.friday.suppe;
      }
    }
    else if (this.selectedTag == 'Samstag') {
      this.newBestellung.date = this.saturday.date;
      this.selectedMenu = 'Menü 2';
      this.newBestellung.menu2 = this.saturday.menu2;
      this.hasSuppe = false;
      if(this.hasNachtisch== true){
        this.newBestellung.nachtisch= this.saturday.nachtisch;
      }
    }
    if(this.selectedMenu =="Menü 2" && this.isVegetarisch == true){
      this.newBestellung.vegetarisch = true;
    }
  }

  kostenBerechnen(){
    this.newBestellung =new Bestellung(this.defaultdate, "", false, 0);
    this.createBestellung();
    var summe = 0;
    if(!this.newBestellung.menu1 ==false){
      var result = summe + this.newBestellung.menu1!.preis;
      var rounded = result.toFixed(2);
      summe = Number(rounded);
    }else if(!this.newBestellung.menu2 ==false){
      var result = summe + this.newBestellung.menu2!.preis;
      var rounded = result.toFixed(2);
      summe = Number(rounded);
    }
    if(!this.newBestellung.nachtisch ==false){
      var result = summe + this.newBestellung.nachtisch!.preis;
      var rounded = result.toFixed(2);
      summe = Number(rounded);
    }
    if(!this.newBestellung.suppe ==false){
      var result = summe + this.newBestellung.suppe!.preis;
      var rounded = result.toFixed(2);
      summe = Number(rounded);
    }
    this.kosten = summe;
  }
}
