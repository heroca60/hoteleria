import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Imodulo } from '../interfaces/imodulo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

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
      return await this._http.get<Imodulo[]>(environment.apiRest + 'modulos').toPromise();
    }
    //************************************************
    
    //***************POST con async/await*************************
    async postData(data: Imodulo) {
      let response = await this._http.post<Imodulo>(environment.apiRest + 'modulos', JSON.stringify(data), this.httpOptions).toPromise();
      return response
    }
}
