import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfiguracionService } from './configuracion.service';
import { Ihabitacionservicio } from '../interfaces/ihabitacionservicio';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HabitacionservicioService {

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
    return await this._http.get<Ihabitacionservicio[]>
      (environment.apiRest + 'habitacionservicios?filter={"where":{"idhotel":' + this._config.hotel.idhotel + '}}').toPromise();
  }
  //************************************************

  //***************POST con async/await*************************
  async postData(data: Ihabitacionservicio) {
    let response = await this._http.post<Ihabitacionservicio>(environment.apiRest + 'habitacionservicios', JSON.stringify(data), this.httpOptions).toPromise();
    return response
  }
}
