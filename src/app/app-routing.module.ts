import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {AdminportalComponent} from './adminportal/adminportal.component';
import { AddGerichtComponent } from './add-gericht/add-gericht.component';
import { AddDayComponent } from './add-day/add-day.component';
import {GerichtVerwaltungComponent} from './gericht-verwaltung/gericht-verwaltung.component';
import {SpeiseplanComponent} from './speiseplan/speiseplan.component';
import {SignUpComponent} from './sign-up/sign-up.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "adminportal", component: AdminportalComponent },
  { path: "addDay", component: AddDayComponent },
  {path: "gerichtVerwaltung", component: GerichtVerwaltungComponent},
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "speiseplan", component: SpeiseplanComponent},
  { path: "sign-up", component: SignUpComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


