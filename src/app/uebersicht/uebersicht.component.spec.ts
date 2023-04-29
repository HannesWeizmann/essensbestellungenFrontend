import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UebersichtComponent } from './uebersicht.component';

import { AppHttpClient } from '../shared/http-client.service';
import { AuthService } from '../shared/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

describe('UebersichtComponent', () => {
  let component: UebersichtComponent;
  let fixture: ComponentFixture<UebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UebersichtComponent,
      MatCard,
      MatCardHeader,
      MatCardTitle,
      MatCardContent ],
      imports: [ HttpClientTestingModule ],
      providers: [ AppHttpClient, AuthService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
