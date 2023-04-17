import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeineBestellungenComponent } from './meine-bestellungen.component';

describe('MeineBestellungenComponent', () => {
  let component: MeineBestellungenComponent;
  let fixture: ComponentFixture<MeineBestellungenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeineBestellungenComponent ]
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
