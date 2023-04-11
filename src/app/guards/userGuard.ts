import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Auth } from 'src/app/guards/auth';
import {LoginComponent} from "src/app/login/login.component";

@Injectable()
export class UserGuard implements CanActivate{
    public auth: Auth = new Auth();

    constructor(private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
        let url: string = state.url;
        return this.isUser(url);
    }
    private isUser(url: string): boolean{
        let role: string = this.auth.getRole();
        if(role != "admin" && role != "user"){
            alert("Sie haben nicht die nötigen Rechte!");
            this.router.navigate(["/login"]);
            return false;
        }
        return true;
    }
}