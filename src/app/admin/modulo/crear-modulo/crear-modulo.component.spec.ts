import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModuloComponent } from './crear-modulo.component';

describe('CrearModuloComponent', () => {
  let component: CrearModuloComponent;
  let fixture: ComponentFixture<CrearModuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearModuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
