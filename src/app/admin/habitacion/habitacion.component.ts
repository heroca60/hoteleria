import { Component, OnInit, ViewChild } from '@angular/core';
import { ListarHabitacionComponent } from './listar-habitacion/listar-habitacion.component';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css']
})
export class HabitacionComponent implements OnInit {


  @ViewChild(ListarHabitacionComponent) componenteListar: ListarHabitacionComponent;
  constructor() { }

  ngOnInit(): void {
  }

  render(val: string): void {
    this.componenteListar.renderm();
  }

}
