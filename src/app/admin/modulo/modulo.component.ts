import { Component, OnInit, ViewChild } from '@angular/core';
import { ListarModuloComponent } from './listar-modulo/listar-modulo.component';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.css']
})
export class ModuloComponent implements OnInit {
  @ViewChild(ListarModuloComponent) componenteListar: ListarModuloComponent;
  constructor() { }

  ngOnInit(): void {
  }

  render(val: string): void {
    this.componenteListar.renderm();
  }

}
