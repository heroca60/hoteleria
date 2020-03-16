import { Component, OnInit } from '@angular/core';
import { Imodulo } from 'src/app/shared/interfaces/imodulo';
import { ModuloService } from 'src/app/shared/servicios/modulo.service';
import { ConfiguracionService } from 'src/app/shared/servicios/configuracion.service';

@Component({
  selector: 'app-listar-modulo',
  templateUrl: './listar-modulo.component.html',
  styleUrls: ['./listar-modulo.component.css']
})
export class ListarModuloComponent implements OnInit {
  datos$: Imodulo[] = [];
  page = 1;
  pageSize = 4;
  collectionSize = 0;

  //icono actualizar
  ia: string;

  constructor(
    private _apiRest: ModuloService,
    private _config: ConfiguracionService
  ) {
    this.ia = this._config.iconoActualizar
   }

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

  get items(): Imodulo[] {
    return this.datos$
      .map((idarticulo, i) => ({ id: i + 1, ...idarticulo }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
