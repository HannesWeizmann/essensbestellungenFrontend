import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeiseplanErstellenComponent } from './speiseplan-erstellen.component';

describe('SpeiseplanErstellenComponent', () => {
  let component: SpeiseplanErstellenComponent;
  let fixture: ComponentFixture<SpeiseplanErstellenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeiseplanErstellenComponent ]
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
