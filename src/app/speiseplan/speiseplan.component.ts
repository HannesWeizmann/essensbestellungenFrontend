import { Component, OnInit } from '@angular/core';
import {Auth} from 'src/app/guards/auth';
import { AppHttpClient } from '../shared/http-client.service';
import { Day } from '../dataclass/day';
import { firstValueFrom, Observable , map} from 'rxjs';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';


@Component({
  selector: 'app-speiseplan',
  templateUrl: './speiseplan.component.html',
  styleUrls: ['./speiseplan.component.scss']
})
export class SpeiseplanComponent implements OnInit {

  constructor(private readonly http: AppHttpClient){}

  public days!: Day[];
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
  tage = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  selectedTag: string = '';
  selectedMenu: string = '';
  hasNachtisch = false;
  hasSuppe = false;
  isVegetarisch = false;

  //variablen nicht final nur zum designen
  public datum = "14.04.2023-21.04.2023";
  public menu1_montag = "Nudeln a la Bolognese (Schwein/Rind) mit Käse";
  public menu2_montag = "Maultaschen mit Kartfoffelsalat";
  public suppe_montag = "Schokoladenpudding";
  public nachtisch_montag = "Nudelsuppe";

  public menu1_dienstag = "Kesselgulasch mit Brötchen";
  public menu2_dienstag = "Tiroler Burger mit Pommes";
  public suppe_dienstag = "Dänische KnusperCreme";
  public nachtisch_dienstag = "Bratknödelsuppe";
  
  public menu1_mittwoch = "Eisbeinfleisch mit Sauerkraut & Erbsenpüree";
  public menu2_mittwoch = "Pasta mit frischem Gemüse und einr Tomaten-Mozarellasauce";
  public suppe_mittwoch = "Obstsalat";
  public nachtisch_mittwoch= "Kartoffelsuppe";

  public menu1_donnerstag = "Dönerteller mit Pommes und Salat";
  public menu2_donnerstag = "Grießbrei mit heißen Früchten";
  public suppe_donnerstag = "Himbeer-Mascarpone Dessert";
  public nachtisch_donnerstag = "Gemüsesuppe";

  public menu1_freitag = "Schnitzel mit Rahmchampions & Rosmarinkartoffeln";
  public menu2_freitag = "Paniertes Seelachsfilet mit Remouladensoße und Bratkartoffeln";
  public suppe_freitag = "Vanilleeis mit Fürchten";
  public nachtisch_freitag = "Grießklößchensuppe";

  public menu1_samstag = "";
  public menu2_samstag = "Würstchengulasch mit Nudeln";
  public suppe_samstag = "Erdbeerkuchen";
  public nachtisch_samstag = "";

  async naechsteWoche(){
    this.montag.setDate(this.montag.getDate()+ 7);
    this.dienstag.setDate(this.dienstag.getDate()+ 7);
    this.mittwoch.setDate(this.mittwoch.getDate()+ 7);
    this.donnerstag.setDate(this.donnerstag.getDate()+ 7);
    this.freitag.setDate(this.freitag.getDate()+ 7);
    this.samstag.setDate(this.samstag.getDate()+ 7);
    this.sonntag.setDate(this.sonntag.getDate()+ 7);
  }

  async vorherigeWoche(){
    this.montag.setDate(this.montag.getDate()- 7);
    this.dienstag.setDate(this.dienstag.getDate()- 7);
    this.mittwoch.setDate(this.mittwoch.getDate()- 7);
    this.donnerstag.setDate(this.donnerstag.getDate()- 7);
    this.freitag.setDate(this.freitag.getDate()- 7);
    this.samstag.setDate(this.samstag.getDate()- 7);
    this.sonntag.setDate(this.sonntag.getDate()- 7);
  }
  
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

  ngOnInit(): void {

    this.username = this.auth.getUsername();
    this.getDays();
    this.getMonday();

    //this.menu1_montag = this.getGericht('Spaghetti Carbonara');

  }

  async getDays(){
    try {
      this.days = await firstValueFrom(this.http.get<Day[]>("/day/",{ withCredentials: true}));
    } catch (error) {
      alert((error as Error).message)
    }
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

}
