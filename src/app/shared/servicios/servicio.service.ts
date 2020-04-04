import { Injectable } from '@angular/core';
import { Iservicio } from '../interfaces/iservicio';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  constructor(
    private _http: HttpClient
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
    return await this._http.get<Iservicio[]>(environment.apiRest + 'servicios').toPromise();
  }

  //***************POST con async/await*************************
  async postElemento(data: Iservicio) {
    let response = await this._http.post<Iservicio>(environment.apiRest + 'servicios', JSON.stringify(data), this.httpOptions).toPromise();
    return response
  }
  
}
