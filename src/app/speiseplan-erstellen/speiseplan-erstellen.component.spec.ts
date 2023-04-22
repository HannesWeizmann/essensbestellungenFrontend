import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SpeiseplanErstellenComponent } from './speiseplan-erstellen.component';

import { AppHttpClient } from '../shared/http-client.service';
import { AuthService } from '../shared/auth.service';

describe('SpeiseplanErstellenComponent', () => {
  let component: SpeiseplanErstellenComponent;
  let fixture: ComponentFixture<SpeiseplanErstellenComponent>;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, delete: jasmine.Spy };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeiseplanErstellenComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ AppHttpClient, AuthService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeiseplanErstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

