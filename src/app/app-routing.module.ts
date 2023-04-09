import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {AdminportalComponent} from './adminportal/adminportal.component';
import { AddGerichtComponent } from './add-gericht/add-gericht.component';
import { AddDayComponent } from './add-day/add-day.component';
import {GerichtVerwaltungComponent} from './gericht-verwaltung/gericht-verwaltung.component';
import {SpeiseplanComponent} from './speiseplan/speiseplan.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import { AdminGuard } from './guards/adminGuard';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "adminportal", component: AdminportalComponent, canActivate:[AdminGuard]},
  { path: "addDay", component: AddDayComponent , canActivate:[AdminGuard]},
  {path: "gerichtVerwaltung", component: GerichtVerwaltungComponent, canActivate:[AdminGuard]},
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "speiseplan", component: SpeiseplanComponent},
  { path: "sign-up", component: SignUpComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


