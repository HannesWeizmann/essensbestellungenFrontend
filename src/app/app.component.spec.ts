import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component';

import { AppHttpClient } from './shared/http-client.service';
import { AuthService } from './shared/auth.service';
import { UserService } from './shared/user.service';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [ AppHttpClient, AuthService, UserService ],
      declarations: [
        AppComponent,
        HeaderComponent,
        MatToolbar,
        MatToolbarRow
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'essensbestellungenFrontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('essensbestellungenFrontend');
  });

});
