import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeiseplanComponent } from './speiseplan.component';

describe('SpeiseplanComponent', () => {
  let component: SpeiseplanComponent;
  let fixture: ComponentFixture<SpeiseplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeiseplanComponent ]
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