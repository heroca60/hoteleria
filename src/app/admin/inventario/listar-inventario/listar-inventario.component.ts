import { Component, OnInit } from '@angular/core';
import { InventarioService } from 'src/app/shared/servicios/inventario.service';
import { ConfiguracionService } from 'src/app/shared/servicios/configuracion.service';
import { Iviewinventario } from 'src/app/shared/interfaces/iviewinventario';

@Component({
  selector: 'app-listar-inventario',
  templateUrl: './listar-inventario.component.html',
  styleUrls: ['./listar-inventario.component.css']
})
export class ListarInventarioComponent implements OnInit {
  datos$: Iviewinventario[] = [];
  page = 1;
  pageSize = 4;
  collectionSize = 0;

  //icono actualizar
  ia: string;

  constructor(
    private _apiRest: InventarioService,
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

  get items(): Iviewinventario[] {
    return this.datos$
      .map((iditem, i) => ({ id: i + 1, ...iditem }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
