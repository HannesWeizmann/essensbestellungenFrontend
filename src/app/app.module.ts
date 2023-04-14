import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppHttpClient } from './shared/http-client.service';
import { AuthService } from './shared/auth.service';
import { UserService } from './shared/user.service';
import { AdminportalComponent } from './adminportal/adminportal.component';
import { AddGerichtComponent } from './add-gericht/add-gericht.component';
import { AddDayComponent } from './add-day/add-day.component';
import { GerichtVerwaltungComponent } from './gericht-verwaltung/gericht-verwaltung.component';
import { ShowGerichtComponent } from './show-gericht/show-gericht.component';
import { SpeiseplanComponent} from './speiseplan/speiseplan.component'
import { SignUpComponent } from './sign-up/sign-up.component';
import {AdminGuard} from 'src/app/guards/adminGuard';
import { UserGuard } from './guards/userGuard';
import { SpeiseplanErstellenComponent } from './speiseplan-erstellen/speiseplan-erstellen.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    AdminportalComponent,
    AddGerichtComponent,
    AddDayComponent,
    GerichtVerwaltungComponent,
    ShowGerichtComponent,
    SpeiseplanComponent,
    SignUpComponent,
    SpeiseplanErstellenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AppHttpClient, AuthService, UserService, AdminGuard, UserGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private http: AppHttpClient) {
    //this.http.setBaseUrl("http://localhost:4500/api");
    this.http.setBaseUrl("http://localhost:3000");
  }
}
