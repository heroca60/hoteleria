import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfiguracionService } from './configuracion.service';
import { environment } from 'src/environments/environment';
import { Iviewhabitacionservicio } from '../interfaces/iviewhabitacionservicio';
import { Ihabitacionservicio } from '../interfaces/ihabitacionservicio';

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
    return await this._http.get<Iviewhabitacionservicio[]>
      (environment.apiRest + 'viewhabitacionservicios/' + this._config.hotel.idhotel).toPromise();
  }
  //************************************************

  //***************POST con async/await*************************
  async postData(data: any) {
    let response = await this._http.post<any>(environment.apiRest + 'habitacionservicios', JSON.stringify(data), this.httpOptions).toPromise();
    return response
  }
}
