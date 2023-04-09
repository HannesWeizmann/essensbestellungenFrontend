import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { UserService } from '../shared/user.service';
import {Auth} from 'src/app/guards/auth';
import {HttpClient} from "@angular/common/http";
import {catchError, from, Observable, of} from 'rxjs';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private currentUser$ = this.userService.getCurrentUser();
  private auth: Auth = new Auth();


  isAdministrator$ = this.userService.getCurrentUser().pipe(map((user) => {
    return user?.isAdministrator();
  }))

  constructor(private router: Router, private readonly authService: AuthService, private readonly userService: UserService,private readonly http: HttpClient) { }

  


  isAdminUser() {
    return this.currentUser$.pipe(map((user) => user?.isAdministrator()));
  }

  isLoggedIn() {
    return this.authService.hasAccessToken();
  }

  ngOnInit(): void {
  }

  async logout() {
    this.authService.reset();
    this.auth.setUsername("");
    this.auth.setRole("");
    const result = await firstValueFrom(this.http.get<any>('http://localhost:3000/users/logout',{ withCredentials: true}))
    await this.router.navigate(["/login"]);
  }
}
