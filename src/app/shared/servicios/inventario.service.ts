import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Iinventario } from '../interfaces/iinventario';
import { environment } from 'src/environments/environment';
import { Iviewinventario } from '../interfaces/iviewinventario';
import { ConfiguracionService } from './configuracion.service';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  constructor(
    private _http: HttpClient,
    private _config: ConfiguracionService
  ) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  //***********GET Async/Away****************** 
  async getData() {
    return await this._http.get<Iviewinventario[]>
      (environment.apiRest + 'viewinventarios/' + this._config.hotel.idhotel).toPromise();
  }

  /*========================================
    Devuelve todos los inventarios activos y no asignados a habitaciones de un 
    respectivo hotel
  =========================================*/
  async getDataActiveNoAsig() {
    return await this._http.get<Iviewinventario[]>
      (environment.apiRest + 'viewinventariosana/' + this._config.hotel.idhotel).toPromise();
  }

  //***************POST con async/await*************************
  async postData(data: Iinventario, cantidad: number) {
    let response = await this._http.post<Iinventario>(environment.apiRest + 'inventarios/' + cantidad, JSON.stringify(data), this.httpOptions).toPromise();
    return response
  }

}
