import { Component, OnInit } from '@angular/core';
import { Iviewhabitacion } from 'src/app/shared/interfaces/iviewhabitacion';
import { HabitacionService } from 'src/app/shared/servicios/habitacion.service';
import { ConfiguracionService } from 'src/app/shared/servicios/configuracion.service';

@Component({
  selector: 'app-listar-habitacion',
  templateUrl: './listar-habitacion.component.html',
  styleUrls: ['./listar-habitacion.component.css']
})
export class ListarHabitacionComponent implements OnInit {
  datos$: Iviewhabitacion[] = [];
 
  page = 1;
  pageSize = 4;
  collectionSize = 0;

  //icono actualizar
  ia: string;
  is: string;
  ii: string;

  constructor(
    private _apiRest: HabitacionService,    
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

  get items(): Iviewhabitacion[] {
    return this.datos$
      .map((iditem, i) => ({ id: i + 1, ...iditem }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


}
