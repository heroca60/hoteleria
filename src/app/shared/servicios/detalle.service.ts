import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Idetalle } from '../interfaces/idetalle';
import { environment } from 'src/environments/environment';
import { Iviewdetalle } from '../interfaces/iviewdetalle';


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
    return await this._http.get<Iviewdetalle[]>
      (environment.apiRest + 'viewdetalles/' + idcompra).toPromise();
  }
  //************************************************  

  //***********GETByInventariado Async/Away****************** 
  async getDataByEstado(idcompra: number) {
    return await this._http.get<Iviewdetalle[]>
      (environment.apiRest + 'viewdetalles/' + idcompra).toPromise();
  }
  //************************************************ 

  //***************POST con async/await*************************
  async postData(data: Idetalle) {
    let response = await this._http.post<Idetalle>(environment.apiRest + 'detalles', JSON.stringify(data), this.httpOptions).toPromise();
    return response
  }


  //***************DELETE con async/await*************************
  async deleteData(id: number) {
    let response = await this._http.delete(environment.apiRest + 'detalles/' + id).toPromise();
    return response
  }

}
