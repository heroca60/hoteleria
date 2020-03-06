import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Iarticulo } from '../interfaces/iarticulo';
import { Observable, BehaviorSubject } from 'rxjs';
//Manejadores de error
import { catchError, map, tap } from 'rxjs/operators';
import { Ihotel } from '../interfaces/ihotel';
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

  //***************POST con async/await*************************
  async postElemento(data: Iarticulo) {
    let response = await this._http.post<Iarticulo>(environment.apiRest + 'articulos', JSON.stringify(data), this.httpOptions).toPromise();
    return response
  }

  //***********GET Async/Away****************** 
  async getElementos() {
    return await this._http.get<Iarticulo[]>(environment.apiRest + 'articulos').toPromise();
  }
  //************************************************


  // GET Observable
  getArticulos(): Observable<Iarticulo[]> {
    return this._http.get<Iarticulo[]>(environment.apiRest + 'articulos');
  }

}
