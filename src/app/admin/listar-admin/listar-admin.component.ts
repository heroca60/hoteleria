import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/shared/servicios/hotel.service';
import { Ihotel } from 'src/app/shared/interfaces/ihotel';
import { Router } from '@angular/router';
import { ConfiguracionService } from 'src/app/shared/servicios/configuracion.service';

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
    private route: Router,
    //servicio de configuración general
    private _config: ConfiguracionService
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

  dashboard(objeto: Ihotel): void {
    this._config.hotel = objeto;
    this.route.navigate(['/dashboard/', objeto.nombrehotel]);    
  }

}
