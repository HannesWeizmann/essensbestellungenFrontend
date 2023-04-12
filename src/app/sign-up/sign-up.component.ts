import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { AppHttpClient } from '../shared/http-client.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userToSignUp: { username: string,
                  email: string 
                  firstname: string, 
                  lastname: string, 
                  personalnummer: string, 
                  password: string
                  role: string } = { username: "", email: "", firstname: "", lastname: "", personalnummer: "", password: "", role: "user" };
  errorMessage: string = "";
  
  constructor(
    private readonly http: AppHttpClient,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.authService.hasAccessToken()) {
      await this.router.navigate(["/login"]);
    }
  }

  async signUp(){
       
    try{
      const result = await firstValueFrom(this.http.post<{User: string, msg: string}>("/users/signup", this.userToSignUp,{ withCredentials: true}))
      //this.http.get<any>('/users/protected',{ withCredentials: true}).subscribe((data: any) => {alert(data.msg)});
      alert(result.msg)
      await this.router.navigate(["/login"]);
    }catch(error){
        this.errorMessage = (error as Error).message;
    }
  }

  async navigateBack(){
    this.router.navigate(['/login'])
  }
}