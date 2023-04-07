import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerichtVerwaltungComponent } from './gericht-verwaltung.component';

describe('GerichtVerwaltungComponent', () => {
  let component: GerichtVerwaltungComponent;
  let fixture: ComponentFixture<GerichtVerwaltungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerichtVerwaltungComponent ]
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
