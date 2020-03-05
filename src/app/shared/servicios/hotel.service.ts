import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Classhotel } from '../clases/classhotel';
import { environment } from '../../../environments/environment';
import { Ihotel } from '../interfaces/ihotel';



@Injectable({
  providedIn: 'root'
})
export class HotelService {

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
  async getElementos() {
    return await this._http.get<Ihotel[]>(environment.apiRest + 'hotels').toPromise();
  }
  //************************************************
  
  //***************POST con async/await*************************
  async postElemento(data: Classhotel) {
    let response = await this._http.post<Classhotel>(environment.apiRest + 'hotels', JSON.stringify(data), this.httpOptions).toPromise();
    return response
  }

}
