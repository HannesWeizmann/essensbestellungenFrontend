import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { AppHttpClient } from '../shared/http-client.service';
import { HttpHeaders } from '@angular/common/http';
import { stringify } from 'qs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userToLogin: { username: string, password: string } = { username: "", password: "" };
  errorMessage: string = "";
  
  constructor(
    private readonly http: AppHttpClient,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.authService.hasAccessToken()) {
      await this.router.navigate(["/speiseplan"]);
    }
  }

  async loginAlt() { 
    try {
      const result = await firstValueFrom(this.http.post<{ access_token: string, userId: string }>("/auth/login", this.userToLogin));
      this.authService.setAccessToken(result.access_token, result.userId);
      await this.router.navigate(["/adminportal"]);
    } catch (error) {
      this.errorMessage = (error as Error).message;
    }
  }


  async login(){
       
    try{
      const result = await firstValueFrom(this.http.post<{User: string, msg: string}>("/users/login", this.userToLogin,{ withCredentials: true}))
      //this.http.get<any>('/users/protected',{ withCredentials: true}).subscribe((data: any) => {alert(data.msg)});
      alert(result.msg)
      await this.router.navigate(["/speiseplan"]);
    }catch(error){
        this.errorMessage = (error as Error).message;
    }
  }
}


