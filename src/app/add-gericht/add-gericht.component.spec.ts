import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AddGerichtComponent } from './add-gericht.component';

import { AppHttpClient } from '../shared/http-client.service';
import { AuthService } from '../shared/auth.service';
import { MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddGerichtComponent', () => {
  let component: AddGerichtComponent;
  let fixture: ComponentFixture<AddGerichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGerichtComponent,
      MatCardHeader,
      MatToolbar,
      MatCardTitle,
      MatCardContent,
      MatFormField,
      MatLabel,
      MatSelect ],
      imports: [ HttpClientTestingModule, MatSelectModule, FormsModule, MatInputModule, BrowserAnimationsModule ],
      providers: [ AppHttpClient, AuthService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGerichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
