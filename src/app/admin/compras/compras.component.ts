import { Component, OnInit, ViewChild } from '@angular/core';
import { ListarComprasComponent } from './listar-compras/listar-compras.component';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  @ViewChild(ListarComprasComponent) componenteListar: ListarComprasComponent;
  
  constructor() { }

  ngOnInit(): void {
  }

  render(val: string): void {
    this.componenteListar.renderm();
  }
  

}
