import { Component, OnInit, ViewChild } from '@angular/core';
import { ListarHabitacionservicioComponent } from './listar-habitacionservicio/listar-habitacionservicio.component';

@Component({
  selector: 'app-habitacionservicio',
  templateUrl: './habitacionservicio.component.html',
  styleUrls: ['./habitacionservicio.component.css']
})
export class HabitacionservicioComponent implements OnInit {

  @ViewChild(ListarHabitacionservicioComponent) componenteListar: ListarHabitacionservicioComponent;
  constructor() { }

  ngOnInit(): void {
  }

  render(val: string): void {
    this.componenteListar.renderm();
  }

}
