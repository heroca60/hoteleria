import { Component, OnInit, ViewChild } from '@angular/core';
import { ListarInventarioComponent } from './listar-inventario/listar-inventario.component';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  @ViewChild(ListarInventarioComponent) componenteListar: ListarInventarioComponent;
  constructor() { }

  ngOnInit(): void {
  }

  render(val: string): void {
    this.componenteListar.renderm();
  }

}
