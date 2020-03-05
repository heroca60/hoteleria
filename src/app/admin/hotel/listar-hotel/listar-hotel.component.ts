import { Component, PipeTransform, OnInit } from '@angular/core';
import { HotelService } from 'src/app/shared/servicios/hotel.service';
import { Ihotel } from '../../../shared/interfaces/ihotel';

@Component({
  selector: 'app-listar-hotel',
  templateUrl: './listar-hotel.component.html',
  styleUrls: ['./listar-hotel.component.css']
})

export class ListarHotelComponent implements OnInit {
  RESULTADOS: Ihotel[];
  page = 1;
  pageSize = 4;
  collectionSize = 0;


  constructor(
    private _apiRest: HotelService,
  ) {
  }

  ngOnInit() {
    this.getHoteles();
  }

  async getHoteles() {
    this.RESULTADOS = await this._apiRest.getElementos();
    this.collectionSize = this.RESULTADOS.length;
  }


  get hoteles(): Ihotel[] {
    return this.RESULTADOS
      .map((idhotel, i) => ({ id: i + 1, ...idhotel }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
