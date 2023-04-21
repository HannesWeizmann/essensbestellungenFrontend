import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {AdminportalComponent} from './adminportal/adminportal.component';
import { AddGerichtComponent } from './add-gericht/add-gericht.component';
import {GerichtVerwaltungComponent} from './gericht-verwaltung/gericht-verwaltung.component';
import {SpeiseplanComponent} from './speiseplan/speiseplan.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import { AdminGuard } from './guards/adminGuard';
import { UserGuard } from './guards/userGuard';
import {SpeiseplanErstellenComponent} from './speiseplan-erstellen/speiseplan-erstellen.component';
import { MeineBestellungenComponent } from './meine-bestellungen/meine-bestellungen.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "adminportal", component: AdminportalComponent, canActivate:[AdminGuard]},
  {path: "gerichtVerwaltung", component: GerichtVerwaltungComponent, canActivate:[AdminGuard]},
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "speiseplan", component: SpeiseplanComponent, canActivate:[UserGuard]},
  { path: "overview", component: OverviewComponent, canActivate:[AdminGuard]},
  { path: "speiseplanErstellen", component: SpeiseplanErstellenComponent, canActivate:[AdminGuard]},
  { path: "meine-bestellungen", component: MeineBestellungenComponent, canActivate:[UserGuard]},
  { path: "sign-up", component: SignUpComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


