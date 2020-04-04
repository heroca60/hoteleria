import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Iarticulo } from 'src/app/shared/interfaces/iarticulo';
import { ArticuloService } from 'src/app/shared/servicios/articulo.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Idetalle } from 'src/app/shared/interfaces/idetalle';
import { ConfiguracionService } from 'src/app/shared/servicios/configuracion.service';

@Component({
  selector: 'app-detalle-compras',
  templateUrl: './detalle-compras.component.html',
  styleUrls: ['./detalle-compras.component.css']
})
export class DetalleComprasComponent implements OnInit {
  articulos$: Iarticulo[] = [];
  datos: any;

  //Listado de detalles
  detalles: Idetalle[];  
  total: number = 0.00;

  //iconos
  ie: string = "";
  it: string = "";

  constructor(
    //inyectando formulario reactivo para validación y captura de datos
    private formBuilder: FormBuilder,
    //inyectando el servicio de articulos
    private _apiRestArticulo: ArticuloService,
    private _config: ConfiguracionService
  ) {
    //Formulario
    this.datos = this.formBuilder.group({
      idarticulo: ['', Validators.required],
      cantidaddetalle: ['', Validators.required],
      preciodetalle: ['', Validators.required],
      inventariadodetalle: [0]
    });
  }

  ngOnInit(): void {
    this.getAllArticulos();
    this.detalles = [];
    this.ie = this._config.iconoEliminar
    this.it = this._config.iconoCargarTodos
  }

  async getAllArticulos() {
    try {
      this.articulos$ = await this._apiRestArticulo.getData();
    } catch (error) {
      alert('Ocurrió un error: ' + error);
    }
  }

  agregarDetalle(): void {
    if (this.datos.valid) {
      let id: number = Number(this.datos.get('idarticulo').value)
      this.datos.controls['idarticulo'].setValue(id);
      this.detalles.push(this.datos.value);
      this.total += (this.datos.get('cantidaddetalle').value * this.datos.get('preciodetalle').value)
    }
  }


  eliminarDetalle(): void {

  }
}

