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

  @Output() mensaje = new EventEmitter<string>();

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
      if (this.validar(id)) {
        this.detalles.push(this.datos.value);
        this.total += (this.datos.get('cantidaddetalle').value * this.datos.get('preciodetalle').value)
        this.datos.reset();
        this.datos.controls['inventariadodetalle'].setValue(0);
      } else {
        this.mensaje.emit("El artículo seleccionado ya se encuentra en el listado.");
        this.datos.reset();
        this.datos.controls['inventariadodetalle'].setValue(0);
      }
    } else {
      this.mensaje.emit("Complete los campos obligatorios");
    }
  }

  eliminarDetalle(id: number): void {
    let i = 0;
    this.detalles.forEach(item => {
      if (id === item.idarticulo) {
        this.total = this.total - (item.cantidaddetalle * item.preciodetalle)
        this.detalles.splice(i, 1);
      }
      i++;
    })
  }

  validar(id: number): boolean {
    let res: boolean = true
    this.detalles.forEach(item => {
      if (item.idarticulo === id) {
        res = false;
      }
    })
    return res;
  }
}

