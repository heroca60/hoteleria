import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Icompra } from '../interfaces/icompra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

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
    return await this._http.get<Icompra[]>(environment.apiRest + 'compras').toPromise();
  }
  //************************************************
  
  //***************POST con async/await*************************
  async postData(data: Icompra) {    
    let response = await this._http.post<Icompra>(environment.apiRest + 'compras', JSON.stringify(data), this.httpOptions).toPromise();
    return response
  }
}
