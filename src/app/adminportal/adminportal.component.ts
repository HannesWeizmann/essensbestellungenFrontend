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

    async navigateToCreateGericht(){
      await this.router.navigate(["/addGericht"])
    }

    async navigateToCreateSpeisseplan(){
      await this.router.navigate(["/addGericht"])
    }
}
