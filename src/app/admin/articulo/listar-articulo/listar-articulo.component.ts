import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/shared/servicios/articulo.service';
import { Iarticulo } from '../../../shared/interfaces/iarticulo';

@Component({
  selector: 'app-listar-articulo',
  templateUrl: './listar-articulo.component.html',
  styleUrls: ['./listar-articulo.component.css']
})
export class ListarArticuloComponent implements OnInit {
  RESULTADOS: Iarticulo[];
  page = 1;
  pageSize = 4;
  collectionSize = 0;

  constructor(
    private _apiRest: ArticuloService,
  ) { }

  ngOnInit() {
    this.getArticulos();
  }

  async getArticulos() {
    this.RESULTADOS = await this._apiRest.getElementos();
    this.collectionSize = this.RESULTADOS.length;
  }


  get articulos(): Iarticulo[] {
    return this.RESULTADOS
      .map((idarticulo, i) => ({ id: i + 1, ...idarticulo }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
