import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Itipo } from '../interfaces/itipo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
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
    return await this._http.get<Itipo[]>(environment.apiRest + 'tipos').toPromise();
  }

  //***************POST con async/await*************************
  async postElemento(data: Itipo) {
    let response = await this._http.post<Itipo>(environment.apiRest + 'tipos', JSON.stringify(data), this.httpOptions).toPromise();
    return response
  }
  
}
