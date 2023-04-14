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
  selectedTag: string | undefined;
  selectedMenu: string | undefined;
  hasNachtisch: boolean = false;
  hasSuppe: boolean = false;

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
    // TODO: Implement logic to submit order to server
  }

  ngOnInit(): void {

    this.username = this.auth.getUsername();

    //this.menu1_montag = this.getGericht('Spaghetti Carbonara');

  }

}
