import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AdminportalComponent } from './adminportal.component';

import { AppHttpClient } from '../shared/http-client.service';
import { AuthService } from '../shared/auth.service';

describe('AdminportalComponent', () => {
  let component: AdminportalComponent;
  let fixture: ComponentFixture<AdminportalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminportalComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ AppHttpClient, AuthService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
