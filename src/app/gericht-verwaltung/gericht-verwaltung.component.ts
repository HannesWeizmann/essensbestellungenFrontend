import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppHttpClient } from '../shared/http-client.service';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-gericht-verwaltung',
  templateUrl: './gericht-verwaltung.component.html',
  styleUrls: ['./gericht-verwaltung.component.scss']
})
export class GerichtVerwaltungComponent {

  constructor(
    private readonly http: AppHttpClient,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}


  async navigateBack(){
    this.router.navigate(['/adminportal'])
  }
}
