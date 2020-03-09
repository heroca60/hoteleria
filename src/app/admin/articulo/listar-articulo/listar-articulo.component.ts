import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/shared/servicios/articulo.service';
import { Iarticulo } from '../../../shared/interfaces/iarticulo';

@Component({
  selector: 'app-listar-articulo',
  templateUrl: './listar-articulo.component.html',
  styleUrls: ['./listar-articulo.component.css']
})
export class ListarArticuloComponent implements OnInit {
  datos$: Iarticulo[] = [];
  page = 1;
  pageSize = 4;
  collectionSize = 0;

  constructor(
    private _apiRest: ArticuloService,
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }

  async getAllData() {
    try {
      this.datos$ = await this._apiRest.getData();
      this.collectionSize = this.datos$.length;
    } catch (error) {
      alert('Ocurrió un error: ' + error);
    }
  }

  renderm(): void {
    this.getAllData();
  }

  get articulos(): Iarticulo[] {
    return this.datos$
      .map((idarticulo, i) => ({ id: i + 1, ...idarticulo }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
