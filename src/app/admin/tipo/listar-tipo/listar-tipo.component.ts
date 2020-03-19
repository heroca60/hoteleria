import { Component, OnInit } from '@angular/core';
import { Itipo } from 'src/app/shared/interfaces/itipo';
import { TipoService } from 'src/app/shared/servicios/tipo.service';
import { ConfiguracionService } from 'src/app/shared/servicios/configuracion.service';

@Component({
  selector: 'app-listar-tipo',
  templateUrl: './listar-tipo.component.html',
  styleUrls: ['./listar-tipo.component.css']
})
export class ListarTipoComponent implements OnInit {
  datos$: Itipo[] = [];
  page = 1;
  pageSize = 4;
  collectionSize = 0;

  //icono actualizar
  ia: string;
  constructor(
    private _apiRest: TipoService,
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

  get items(): Itipo[] {
    return this.datos$
      .map((idarticulo, i) => ({ id: i + 1, ...idarticulo }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
