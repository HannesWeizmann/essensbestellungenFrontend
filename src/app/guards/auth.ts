import { Injectable } from '@angular/core';

const ROLE = "user"; 
const USERNAME = "";

@Injectable()
export class Auth{
    private role: string = localStorage.getItem(ROLE) || "user";
    private username: string = localStorage.getItem(USERNAME) || "";

    constructor(){}

    setRole(role: string){
        this.role = role;
        localStorage.setItem(ROLE, this.role)
    }

    getRole(): string{
        let role:string = localStorage.getItem(ROLE) || "user";
        return role;
    }

    setUsername(username: string){
        this.username = username;
        localStorage.setItem(USERNAME, this.username)
    }

    getUsername(): string{
        let username:string = localStorage.getItem(USERNAME) || "";
        return username;
    }
}