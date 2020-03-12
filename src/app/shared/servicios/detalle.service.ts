import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Idetalle } from '../interfaces/idetalle';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

const WIKI_URL = 'https://en.wikipedia.org/w/api.php';
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});


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
  async getData() {
    return await this._http.get<Idetalle[]>(environment.apiRest + 'detalles').toPromise();
  }
  //************************************************
  
  //***************POST con async/await*************************
  async postData(data: Idetalle) {    
    let response = await this._http.post<Idetalle>(environment.apiRest + 'detalles', JSON.stringify(data), this.httpOptions).toPromise();
    return response
  }

  //PRobando el search automatico
  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this._http
      .get(WIKI_URL, {params: PARAMS.set('search', term)}).pipe(
        map(response => response[1])
      );
  }

}
