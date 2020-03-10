import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { HotelService } from 'src/app/shared/servicios/hotel.service';
import { Ihotel } from '../../../shared/interfaces/ihotel';
import { ConfiguracionService } from 'src/app/shared/servicios/configuracion.service';

@Component({
  selector: 'app-listar-hotel',
  templateUrl: './listar-hotel.component.html',
  styleUrls: ['./listar-hotel.component.css'],
})

export class ListarHotelComponent implements OnInit {
  @Output() update = new EventEmitter<Boolean>();

  datos$: Ihotel[] = [];
  page = 1;
  pageSize = 4;
  collectionSize = 0;

  //referencias al tipo de icono utilizado para el CLAE
  ic: String
  il: String
  ia: String
  ie: String

  constructor(
    private _apiRest: HotelService,
    private _config: ConfiguracionService,
  ) {
    this.ic = this._config.iconoCrear
    this.il = this._config.iconoLeer
    this.ia = this._config.iconoActualizar
    this.ie = this._config.iconoEliminar
  }

  ngOnInit() {
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


  get datos(): Ihotel[] {
    return this.datos$
      .map((idhotel, i) => ({ id: i + 1, ...idhotel }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  updateData() {
    this.update.emit(false); 
  }

}
