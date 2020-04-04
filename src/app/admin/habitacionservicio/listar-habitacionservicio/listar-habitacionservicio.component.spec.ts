import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarHabitacionservicioComponent } from './listar-habitacionservicio.component';

describe('ListarHabitacionservicioComponent', () => {
  let component: ListarHabitacionservicioComponent;
  let fixture: ComponentFixture<ListarHabitacionservicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarHabitacionservicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarHabitacionservicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
