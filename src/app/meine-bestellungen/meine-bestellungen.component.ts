import { Component, OnInit } from '@angular/core';
import { AppHttpClient } from '../shared/http-client.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import {Bestellung} from 'src/app/dataclass/bestellung';
import { Auth } from '../guards/auth';
import { firstValueFrom, Observable , map} from 'rxjs';


@Component({
  selector: 'app-meine-bestellungen',
  templateUrl: './meine-bestellungen.component.html',
  styleUrls: ['./meine-bestellungen.component.scss']
})
export class MeineBestellungenComponent implements OnInit{

  defaultdate = new Date();
  auth: Auth = new Auth();
  username = "";
  myBestellungen: Bestellung[] = [];
  defaultBestellung: Bestellung = new Bestellung(this.defaultdate, "", false, 0);
  bestellung: Bestellung = this.defaultBestellung;
  detailsVisible: Boolean = false; 
  hasMenu1: Boolean = false; 
  hasMenu2: Boolean = false;
  hasNachtisch: Boolean = false; 
  hasSuppe: Boolean = false;
  isVegetarisch ="Nein";  

  constructor(
      private readonly http: AppHttpClient,
      private readonly router: Router,
      private readonly authService: AuthService,
  ) {}

  ngOnInit(): void{
    this.username = this.auth.getUsername();
    this.getMyBestellungen();
  }

  async navigateBack(){
      this.router.navigate(['/speiseplan'])
  }

  async getMyBestellungen(){
    try {
      this.myBestellungen = await firstValueFrom(this.http.get('/bestellung/' + this.username, { withCredentials: true}));
      let transfer: Date | undefined;
      this.myBestellungen.forEach(element => {
        transfer = new Date(element.date);
        element.date = transfer;
      });      
      this.myBestellungen.sort((a,b)=> a.date.getTime() - b.date.getTime());

    } catch (error) {
      alert((error as Error).message);
    }
  }

  showDetails(_id: string | undefined){
    this.myBestellungen.forEach(element => {
      if(element._id == _id){
        this.bestellung = element;
      }
    });

    if(!this.bestellung.menu1 == false){
      this.hasMenu1 = true;
      this.hasMenu2 = false;
    }
    else{
      this.hasMenu2 = true;
      this.hasMenu1 = false;
    }
    if(!this.bestellung.nachtisch ==false){
      this.hasNachtisch =true;
    }else{
      this.hasNachtisch= false;
    }
    if(!this.bestellung.suppe ==false){
      this.hasSuppe =true;
    }else{
      this.hasSuppe=false;
    }
    if(this.bestellung.vegetarisch==true){
      this.isVegetarisch = "Ja";
    }
    else{
      this.isVegetarisch ="Nein";
    }

    this.detailsVisible = true;
  }

  async deleteBestellung(id: string|undefined){
    try {
      const result = await firstValueFrom(this.http.delete('/bestellung/' + id, { withCredentials: true}));
      this.getMyBestellungen();
      this.detailsVisible = false;
    } catch (error) {
      alert((error as Error).message)
    }
  }
    
}