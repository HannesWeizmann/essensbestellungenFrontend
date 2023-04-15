import { Component, OnInit } from '@angular/core';
import {Auth} from 'src/app/guards/auth';

@Component({
  selector: 'app-speiseplan',
  templateUrl: './speiseplan.component.html',
  styleUrls: ['./speiseplan.component.scss']
})
export class SpeiseplanComponent implements OnInit {
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
  public menu1_montag = "fleisch";
  public menu2_montag = "";
  public suppe_montag = "";
  public nachtisch_montag = "";

  public menu1_dienstag = "fisch";
  public menu2_dienstag = "";
  public suppe_dienstag = "";
  public nachtisch_dienstag = "";
  
  public menu1_mittwoch = "pizza";
  public menu2_mittwoch = "";
  public suppe_mittwoch = "";
  public nachtisch_mittwoch= "";

  public menu1_donnerstag = "kartoffeln";
  public menu2_donnerstag = "";
  public suppe_donnerstag = "";
  public nachtisch_donnerstag = "";

  public menu1_freitag = "lasagne";
  public menu2_freitag = "";
  public suppe_freitag = "";
  public nachtisch_freitag = "";

  public menu1_samstag = "pudding";
  public menu2_samstag = "";
  public suppe_samstag = "";
  public nachtisch_samstag = "";

  async naechsteWoche(){
    //speiseplan der nächsten woche soll angezeigt werden
  }

  async vorherigeWoche(){
    //nachdem man auf nachste woche gedrückt hat, soll man mit diesem knopf wieder
    //zurück navigieren können
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

    //this.menu1_montag = this.getGericht('Spaghetti Carbonara');

  }

}
