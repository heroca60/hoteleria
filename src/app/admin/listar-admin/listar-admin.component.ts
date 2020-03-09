import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/shared/servicios/hotel.service';
import { Ihotel } from 'src/app/shared/interfaces/ihotel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-admin',
  templateUrl: './listar-admin.component.html',
  styleUrls: ['./listar-admin.component.css']
})
export class ListarAdminComponent implements OnInit {
  //datos obtenidos del get
  datos$: Ihotel[] = [];

  constructor(
    private _apiRest: HotelService,
    //variable de ruteo
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }

  async getAllData() {
    try {      
      this.datos$ = await this._apiRest.getData();
    } catch (error) {
      alert('Ocurrió un error: ' + error);
    }
  }

  render(): void {
    this.getAllData();
  }

  dashboard(valhotel: Ihotel): void {
    let id: number = valhotel.idhotel;
    this.route.navigate(['/dashboard/', valhotel.nombrehotel]);
    localStorage.setItem("checksum", id.toString());
  }

}
