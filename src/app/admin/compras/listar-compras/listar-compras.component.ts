import { Component, OnInit} from '@angular/core';
import { Icompra } from '../../../shared/interfaces/icompra';
import { ConfiguracionService } from 'src/app/shared/servicios/configuracion.service';
import { CompraService } from 'src/app/shared/servicios/compra.service';

@Component({
  selector: 'app-listar-compras',
  templateUrl: './listar-compras.component.html',
  styleUrls: ['./listar-compras.component.css']
})

export class ListarComprasComponent implements OnInit {
  datos$: Icompra[] = [];    

  page = 1;
  pageSize = 4;
  collectionSize = 0;
  hotel: string;

  hotelSeleccionado: string;
  compraSeleccionada: Icompra;

  //icono actualizar
  ic: string;
  //icono listar
  il: string;
  //icono eliminar
  ie: string;

  public isCollapsed = true;  

  //*************** */
  relay: any;
  response: any;

  saludo:string;
  
  
  constructor(
    private _apiRest: CompraService,
    private _config: ConfiguracionService,
  ) {
    this.ic = this._config.iconoCrear
    this.il = this._config.iconoListar
    this.ie = this._config.iconoEliminar
    this.hotel = this._config.hotel.nombrehotel
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

  get items(): Icompra[] {
    return this.datos$
      .map((iditem, i) => ({ id: i + 1, ...iditem }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

 }
