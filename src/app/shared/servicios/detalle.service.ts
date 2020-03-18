import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Idetalle } from '../interfaces/idetalle';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  constructor(
    private _http: HttpClient
  ) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  //***********GET Async/Away****************** 
  async getData(idcompra: number) {
    return await this._http.get<Idetalle[]>
      (environment.apiRest + 'detalles?filter={"where":{"idcompra":' + idcompra + '}}').toPromise();
  }
  //************************************************  

  //***************POST con async/await*************************
  async postData(data: Idetalle) {
    let response = await this._http.post<Idetalle>(environment.apiRest + 'detalles', JSON.stringify(data), this.httpOptions).toPromise();
    return response
  }



}
