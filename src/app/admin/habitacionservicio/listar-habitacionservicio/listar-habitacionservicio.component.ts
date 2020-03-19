import { Component, OnInit } from '@angular/core';
import { Ihabitacionservicio } from 'src/app/shared/interfaces/ihabitacionservicio';
import { HabitacionservicioService } from 'src/app/shared/servicios/habitacionservicio.service';
import { ConfiguracionService } from 'src/app/shared/servicios/configuracion.service';

@Component({
  selector: 'app-listar-habitacionservicio',
  templateUrl: './listar-habitacionservicio.component.html',
  styleUrls: ['./listar-habitacionservicio.component.css']
})
export class ListarHabitacionservicioComponent implements OnInit {
  datos$: Ihabitacionservicio[] = [];
  page = 1;
  pageSize = 4;
  collectionSize = 0;

  //icono actualizar
  ia: string;

  constructor(
    private _apiRest: HabitacionservicioService,
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

  get items(): Ihabitacionservicio[] {
    return this.datos$
      .map((idarticulo, i) => ({ id: i + 1, ...idarticulo }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
