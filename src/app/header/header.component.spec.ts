import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HeaderComponent } from './header.component';

import { AppHttpClient } from '../shared/http-client.service';
import { AuthService } from '../shared/auth.service';
import { UserService } from '../shared/user.service';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent,
      MatToolbar,
      MatToolbarRow ],
      imports: [ HttpClientTestingModule ],
      providers: [ AppHttpClient, AuthService, UserService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
