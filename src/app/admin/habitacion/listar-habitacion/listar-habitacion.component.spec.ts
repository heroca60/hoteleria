import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarHabitacionComponent } from './listar-habitacion.component';

describe('ListarHabitacionComponent', () => {
  let component: ListarHabitacionComponent;
  let fixture: ComponentFixture<ListarHabitacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarHabitacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
