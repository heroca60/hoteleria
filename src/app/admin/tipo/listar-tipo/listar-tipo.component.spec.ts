import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTipoComponent } from './listar-tipo.component';

describe('ListarTipoComponent', () => {
  let component: ListarTipoComponent;
  let fixture: ComponentFixture<ListarTipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarTipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
