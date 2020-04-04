import { Component, OnInit } from '@angular/core';
import { Iservicio } from 'src/app/shared/interfaces/iservicio';
import { ServicioService } from 'src/app/shared/servicios/servicio.service';
import { ConfiguracionService } from 'src/app/shared/servicios/configuracion.service';

@Component({
  selector: 'app-listar-servicio',
  templateUrl: './listar-servicio.component.html',
  styleUrls: ['./listar-servicio.component.css']
})
export class ListarServicioComponent implements OnInit {
  datos$: Iservicio[] = [];
  page = 1;
  pageSize = 4;
  collectionSize = 0;

  //icono actualizar
  ia: string;

  constructor(
    private _apiRest: ServicioService,
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

  get items(): Iservicio[] {
    return this.datos$
      .map((idarticulo, i) => ({ id: i + 1, ...idarticulo }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
