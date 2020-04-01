import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Icompra } from '../../../shared/interfaces/icompra';
import { ConfiguracionService } from 'src/app/shared/servicios/configuracion.service';
import { CompraService } from 'src/app/shared/servicios/compra.service';
import { Subject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { DetalleService } from 'src/app/shared/servicios/detalle.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { ArticuloService } from 'src/app/shared/servicios/articulo.service';
import { Iarticulo } from 'src/app/shared/interfaces/iarticulo';
import { Idetalle } from 'src/app/shared/interfaces/idetalle';
import { Iviewdetalle } from 'src/app/shared/interfaces/iviewdetalle';

@Component({
  selector: 'app-listar-compras',
  templateUrl: './listar-compras.component.html',
  styleUrls: ['./listar-compras.component.css']
})

export class ListarComprasComponent implements OnInit {
  datos$: Icompra[] = [];
  datosA$: Iarticulo[] = [];
  datosD$: Iviewdetalle[] = [];

  page = 1;
  pageSize = 4;
  collectionSize = 0;
  hotel: string;

  hotelSeleccionado: string;
  compraSeleccionada: Icompra;

  //icono actualizar
  ic: string;
  //icono listar
  il: string;
  //icono eliminar
  ie: string;

  public isCollapsed = true;
  private _success = new Subject<string>();

  //*************** */
  relay: any;
  response: any;

  //Variables para el mensaje de transacción
  staticAlertClosed = false;
  successMessage: string;
  messageType: string;

  //Resultado del modal
  closeResult: string;

  //Datos del formulario
  datos: any;
  /*variable para la alert de info donde se carga la 
  información de la compra seleccionada*/
  tipo: string = "info";

  //variable de boton de carga
  btnLoading: boolean = true;

  total: number = 0.00;

  //
  articuloseleccionado: string = "";

  idcompra: number = 0;

  constructor(
    private _apiRest: CompraService,
    private _config: ConfiguracionService,

    //inyectando formulario reactivo para validación y captura de datos
    private formBuilder: FormBuilder,
    //inyectando apiREST
    private _apiRestDetalle: DetalleService,
    private _apiRestArticulo: ArticuloService,
    //modal
    private modalService: NgbModal

  ) {
    this.ic = this._config.iconoCrear
    this.il = this._config.iconoListar
    this.ie = this._config.iconoEliminar
    this.hotel = this._config.hotel.nombrehotel

    this.datos = this.formBuilder.group({
      idcompra: ['', Validators.required],
      idarticulo: ['', Validators.required],
      cantidaddetalle: ['', Validators.required],
      preciodetalle: ['', Validators.required],
      inventariadodetalle: [0]
    })
  }

  ngOnInit(): void {
    this.getAllData();
    this.getAllDataArticulos();
    //Manejo de las alertas del formulario
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
    //Fin del manejo de las alertas del formulario
  }

  async getAllData() {
    try {
      this.datos$ = await this._apiRest.getData();
      this.collectionSize = this.datos$.length;
    } catch (error) {
      alert('Ocurrió un error: ' + error);
    }
  }

  async getAllDataArticulos() {
    try {
      this.datosA$ = await this._apiRestArticulo.getData();
    } catch (error) {
      alert('Ocurrió un error: ' + error);
    }
  }


  async getDetalleCompra(id: number) {
    try {
      this.idcompra = id;
      this.datosD$ = await this._apiRestDetalle.getData(id);
      this.total = 0.00;
      this.datosD$.forEach(item => {
        this.total += (item.cantidaddetalle * item.preciodetalle);
      });
    } catch (error) {
      alert('Ocurrió un error: ' + error);
    }
  }

  renderm(): void {
    this.getAllData();
  }

  get items(): Icompra[] {
    return this.datos$
      .map((iditem, i) => ({ id: i + 1, ...iditem }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  //Modal
  openModalDetalle(content: any, hotel: string, compra: Icompra) {
    this.hotelSeleccionado = hotel;
    this.compraSeleccionada = compra;
    this.datos.controls['idcompra'].setValue(compra.idcompra);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //Modal
  openModalListadoDetalle(content: any, hotel: string, compra: Icompra) {
    try {
      this.getDetalleCompra(compra.idcompra);
    } catch (error) {
      alert(error);
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', scrollable: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //Modal
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //post Detalle de compra con async/await
  async nuevoElemento() {
    if (this.datos.valid) {
      try {
        //Convirtiendo el tipo de dato a a numérico                
        let id: number = Number(this.datos.get('idarticulo').value);
        this.datos.controls['idarticulo'].setValue(id);
        //
        this.btnLoading = false;
        await this._apiRestDetalle.postData(this.datos.value);
        this.messageType = "success";
        this._success.next("Registro almacenado exitosamente !!!");
        /*Limpiando campos del form reactivo de forma manual
        porque se necesita seguir manteniendo el id compra para realizar
        constantes detalles... */
        this.datos.controls['idarticulo'].setValue('');
        this.datos.controls['cantidaddetalle'].setValue('');
        this.datos.controls['preciodetalle'].setValue('');
        this.btnLoading = true;
      } catch (error) {
        this.btnLoading = true;
        this.messageType = "danger";
        this._success.next("Ocurrió un error: " + error.value);
      }
    } else {
      this.messageType = "warning";
      this._success.next("Complete los campos que son obligatorios");
    }
  }

  earticulo(e: any): void {
    this.articuloseleccionado = ""
    this.datosA$.forEach(element => {
      if (element.idarticulo == e.target.value) {
        this.articuloseleccionado = element.nombrearticulo
      }
    });
  }

  async eliminarDetalle(id: number) {
    try {
      let res = await this._apiRestDetalle.deleteData(id);
      this.messageType = "info";
      this._success.next(res.toString());
      this.getDetalleCompra(this.idcompra);
    } catch (error) {

    }
  }

}
