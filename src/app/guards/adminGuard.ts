import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Auth } from 'src/app/guards/auth';
import {LoginComponent} from "src/app/login/login.component";

@Injectable()
export class AdminGuard implements CanActivate{
    constructor(private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
        let url: string = state.url;
        return this.isUserAdmin(url);
    }
    private isUserAdmin(url: string): boolean{
        let auth: Auth = new Auth();
        let role: string = auth.getRole();
        if(role != "admin"){alert("Sie haben nicht die nötigen Rechte!")}
        return role == "admin";
    }
}