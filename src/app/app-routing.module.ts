import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UserManagementComponent } from './user-management/user-management.component';
import {AdminportalComponent} from './adminportal/adminportal.component';
import { AddGerichtComponent } from './add-gericht/add-gericht.component';
import { AddDayComponent } from './add-day/add-day.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "profile", component: ProfileComponent },
  { path: "transactions", component: TransactionsComponent },
  { path: "user-management", component: UserManagementComponent },
  { path: "adminportal", component: AdminportalComponent },
  { path: "addGericht", component: AddGerichtComponent },
  { path: "addDay", component: AddDayComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


