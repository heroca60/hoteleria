import { Component, OnInit, ViewChild } from '@angular/core';
import { ListarServicioComponent } from './listar-servicio/listar-servicio.component';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  @ViewChild(ListarServicioComponent) componenteListar: ListarServicioComponent;  

  constructor() { }

  ngOnInit(): void {
  }


  render(val: string): void {    
    this.componenteListar.renderm();
  }

}
