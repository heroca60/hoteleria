import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearHabitacionservicioComponent } from './crear-habitacionservicio.component';

describe('CrearHabitacionservicioComponent', () => {
  let component: CrearHabitacionservicioComponent;
  let fixture: ComponentFixture<CrearHabitacionservicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearHabitacionservicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearHabitacionservicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
