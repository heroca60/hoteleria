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

@Component({
  selector: 'app-listar-compras',
  templateUrl: './listar-compras.component.html',
  styleUrls: ['./listar-compras.component.css']
})

export class ListarComprasComponent implements OnInit {
  datos$: Icompra[] = [];
  datosA$: Iarticulo[] = [];

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

  tipo: string = "info";


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
    this.hotel = this._config.hotel.nombrehotel    

    this.datos = this.formBuilder.group({
      idcompra: ['', Validators.required],
      idarticulo: ['', Validators.required],
      cantidaddetalle: ['', Validators.required],
      preciodetalle: ['', Validators.required]
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
      this.collectionSize = this.datos$.length;
    } catch (error) {
      alert('Ocurrió un error: ' + error);
    }
  }

  renderm(): void {
    this.getAllData();
  }

  get items(): Icompra[] {
    return this.datos$
      .map((idarticulo, i) => ({ id: i + 1, ...idarticulo }))
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
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //post articulo con async/await
  async nuevoElemento() {
    if (this.datos.valid) {
      try {        
        await this._apiRestDetalle.postData(this.datos.value);
        this.messageType = "success";
        this._success.next("Registro almacenado exitosamente !!!");
        this.datos.reset();
      } catch (error) {
        this.messageType = "danger";
        this._success.next("Ocurrió un error: " + error);
      }
    } else {
      this.messageType = "warning";
      this._success.next("Complete los campos que son obligatorios");
    }
  }

}
