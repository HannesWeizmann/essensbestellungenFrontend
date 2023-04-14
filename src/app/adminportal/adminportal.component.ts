import { Component } from '@angular/core';
import { AppHttpClient } from '../shared/http-client.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-adminportal',
  templateUrl: './adminportal.component.html',
  styleUrls: ['./adminportal.component.scss']
})
export class AdminportalComponent {

  constructor(
    private readonly http: AppHttpClient,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

    async navigateToGerichtVerwaltung(){
      await this.router.navigate(["/gerichtVerwaltung"])
    }

    async navigateToCreateSpeiseplan(){
      await this.router.navigate(["/speiseplanErstellen"])
    }

    async navigateBack(){
      this.router.navigate(['/speiseplan'])
    }
}
