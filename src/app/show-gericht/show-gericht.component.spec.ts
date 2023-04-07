import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGerichtComponent } from './show-gericht.component';

describe('ShowGerichtComponent', () => {
  let component: ShowGerichtComponent;
  let fixture: ComponentFixture<ShowGerichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowGerichtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowGerichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
