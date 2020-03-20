import { Component, OnInit } from '@angular/core';
import { Ihabitacionservicio } from 'src/app/shared/interfaces/ihabitacionservicio';
import { HabitacionservicioService } from 'src/app/shared/servicios/habitacionservicio.service';
import { ConfiguracionService } from 'src/app/shared/servicios/configuracion.service';
import { Iviewhabitacionservicio } from 'src/app/shared/interfaces/iviewhabitacionservicio';

@Component({
  selector: 'app-listar-habitacionservicio',
  templateUrl: './listar-habitacionservicio.component.html',
  styleUrls: ['./listar-habitacionservicio.component.css']
})


export class ListarHabitacionservicioComponent implements OnInit {
  datos$: Iviewhabitacionservicio[] = [];
 
  page = 1;
  pageSize = 4;
  collectionSize = 0;

  //icono actualizar
  ia: string;
  is: string;
  ii: string;

  constructor(
    private _apiRest: HabitacionservicioService,    
    private _config: ConfiguracionService
  ) {
    this.ia = this._config.iconoActualizar
    this.is = this._config.iconoServicios
    this.ii = this._config.iconoInventario
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

  get items(): Iviewhabitacionservicio[] {
    return this.datos$
      .map((iditem, i) => ({ id: i + 1, ...iditem }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
