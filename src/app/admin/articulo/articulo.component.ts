import { Component, OnInit, ViewChild } from '@angular/core';
import { ListarArticuloComponent } from './listar-articulo/listar-articulo.component';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {
  @ViewChild(ListarArticuloComponent) componenteListar: ListarArticuloComponent;

  constructor() { }

  ngOnInit(): void {
  }



  render(val: string): void {
    this.componenteListar.renderm();
  }
}
