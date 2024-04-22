import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificationComponent } from './calification.component';

describe('CalificationComponent', () => {
  let component: CalificationComponent;
  let fixture: ComponentFixture<CalificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalificationComponent]
    });
    fixture = TestBed.createComponent(CalificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
