import { Component, OnInit, ViewChild } from '@angular/core';
import { ListarTipoComponent } from './listar-tipo/listar-tipo.component';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css']
})
export class TipoComponent implements OnInit {
  @ViewChild(ListarTipoComponent) componenteListar: ListarTipoComponent;

  constructor() { }

  ngOnInit(): void {
  }

  render(val: string): void {
    this.componenteListar.renderm();
  }

}
