import { Component, OnInit } from '@angular/core';
import {Kategorie} from './Kategorie';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { AppHttpClient } from '../shared/http-client.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-add-gericht',
  templateUrl: './add-gericht.component.html',
  styleUrls: ['./add-gericht.component.scss']
})

export class AddGerichtComponent{

    newGericht: {name: string, preis: number, kategorie: Kategorie } = {name:"", preis:0.0, kategorie:0};

    
    constructor(
      private readonly http: AppHttpClient,
      private readonly router: Router,
      private readonly authService: AuthService,
    ) {}

      async navigateBack(){
        this.router.navigate(['/adminportal'])
      }

      async addGericht(){
        try{
          const result = await firstValueFrom(this.http.post<any>("/gericht", this.newGericht, {withCredentials: true}))
          alert(result.name)
          this.newGericht.name = "";
          this.newGericht.preis = 0;
          
        }catch(error)
        {
            alert((error as Error).message)
        }
      }

}
