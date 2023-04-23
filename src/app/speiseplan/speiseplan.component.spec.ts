import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SpeiseplanComponent } from './speiseplan.component';


import { AppHttpClient } from '../shared/http-client.service';
import { AuthService } from '../shared/auth.service';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('SpeiseplanComponent', () => {
  let component: SpeiseplanComponent;
  let fixture: ComponentFixture<SpeiseplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeiseplanComponent,
        MatCard,
        MatCardFooter,
        MatCardActions,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatFormField,
        MatLabel,
        MatSelect,
        MatCheckbox ],
      imports: [ HttpClientTestingModule, MatSelectModule, FormsModule, BrowserAnimationsModule, MatCheckboxModule ],
      providers: [ AppHttpClient, AuthService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeiseplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});