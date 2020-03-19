import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitacionservicioComponent } from './habitacionservicio.component';

describe('HabitacionservicioComponent', () => {
  let component: HabitacionservicioComponent;
  let fixture: ComponentFixture<HabitacionservicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitacionservicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitacionservicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
