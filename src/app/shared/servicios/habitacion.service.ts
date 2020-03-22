import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ihabitacion } from '../interfaces/ihabitacion';
import { environment } from 'src/environments/environment';
import { Iviewhabitacion } from '../interfaces/iviewhabitacion';
import { ConfiguracionService } from './configuracion.service';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
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
    return await this._http.get<Iviewhabitacion[]>
      (environment.apiRest + 'viewhabitaciones/' + this._config.hotel.idhotel).toPromise();
  }

  //***************POST con async/await*************************
  async postElemento(data: Ihabitacion) {
    let response = await this._http.post<Ihabitacion>(environment.apiRest + 'habitaciones', JSON.stringify(data), this.httpOptions).toPromise();
    return response
  }

}