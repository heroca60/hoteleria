import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Iarticulo } from '../interfaces/iarticulo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

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
    return await this._http.get<Iarticulo[]>(environment.apiRest + 'articulos').toPromise();
  }

  //***************POST con async/await*************************
  async postElemento(data: Iarticulo) {
    let response = await this._http.post<Iarticulo>(environment.apiRest + 'articulos', JSON.stringify(data), this.httpOptions).toPromise();
    return response
  }
  
}
