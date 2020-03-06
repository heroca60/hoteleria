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
  async getData() {
    return await this._http.get<Ihotel[]>(environment.apiRest + 'hotels').toPromise();
  }
  //************************************************
  
  //***************POST con async/await*************************
  async postData(data: Ihotel) {
    let response = await this._http.post<Ihotel>(environment.apiRest + 'hotels', JSON.stringify(data), this.httpOptions).toPromise();
    return response
  }

}
