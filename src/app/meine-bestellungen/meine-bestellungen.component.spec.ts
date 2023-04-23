import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MeineBestellungenComponent } from './meine-bestellungen.component';

import { AppHttpClient } from '../shared/http-client.service';
import { AuthService } from '../shared/auth.service';

describe('MeineBestellungenComponent', () => {
  let component: MeineBestellungenComponent;
  let fixture: ComponentFixture<MeineBestellungenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeineBestellungenComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ AppHttpClient, AuthService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeineBestellungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
