import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GerichtVerwaltungComponent } from './gericht-verwaltung.component';

import { AppHttpClient } from '../shared/http-client.service';
import { AuthService } from '../shared/auth.service';
import { AddGerichtComponent } from '../add-gericht/add-gericht.component';
import { ShowGerichtComponent } from '../show-gericht/show-gericht.component';
import { MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('GerichtVerwaltungComponent', () => {
  let component: GerichtVerwaltungComponent;
  let fixture: ComponentFixture<GerichtVerwaltungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerichtVerwaltungComponent, 
        AddGerichtComponent, 
        ShowGerichtComponent,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatFormField,
        MatLabel,
        MatSelect],
      imports: [ HttpClientTestingModule, MatSelectModule, FormsModule, MatInputModule, BrowserAnimationsModule ],
      providers: [ AppHttpClient, AuthService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerichtVerwaltungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
