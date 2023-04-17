import { Component } from '@angular/core';
import { AppHttpClient } from '../shared/http-client.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-meine-bestellungen',
  templateUrl: './meine-bestellungen.component.html',
  styleUrls: ['./meine-bestellungen.component.scss']
})
export class MeineBestellungenComponent {

    constructor(
        private readonly http: AppHttpClient,
        private readonly router: Router,
        private readonly authService: AuthService,
      ) {}

    async navigateBack(){
        this.router.navigate(['/speiseplan'])
      }
}