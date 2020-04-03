import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { InventarioService } from 'src/app/shared/servicios/inventario.service';
import { NgbModal, ModalDismissReasons, NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfiguracionService } from 'src/app/shared/servicios/configuracion.service';
import { debounceTime } from 'rxjs/operators';
import { CompraService } from 'src/app/shared/servicios/compra.service';
import { Icompra } from 'src/app/shared/interfaces/icompra';
import { DetalleService } from 'src/app/shared/servicios/detalle.service';
import { Iviewdetalle } from 'src/app/shared/interfaces/iviewdetalle';

@Component({
  selector: 'app-crear-inventario',
  templateUrl: './crear-inventario.component.html',
  styleUrls: ['./crear-inventario.component.css']
})
export class CrearInventarioComponent implements OnInit {
  compras: Icompra[] = [];
  detalles: Iviewdetalle[] = [];

  private _success = new Subject<string>();
  //*************** */
  relay: any;
  response: any;

  //Variables para el mensaje de transacción
  staticAlertClosed = true;
  successMessage: string;
  messageType: string;

  //Resultado del modal
  closeResult: string;

  //Datos del formulario
  datos: any;

  //Evento para el padre... post exitoso render del list.
  @Output() renderSon = new EventEmitter<string>();

  //Control del boton carga...
  btnLoading: boolean = true;

  idcompra: number;
  seleccionado: boolean = false;

  constructor(
    //inyectando formulario reactivo para validación y captura de datos
    private formBuilder: FormBuilder,
    //inyectando apiREST
    private _apiRest: InventarioService,
    private _apiCompras: CompraService,
    private _apiDetalles: DetalleService,
    //modal
    private modalService: NgbModal,
    //configuracion
    //servicio de configuración general
    private _config: ConfiguracionService,


  ) {
    //Formulario
    this.datos = this.formBuilder.group({
      idhotel: [this._config.hotel.idhotel],
      iddetalle: ['', Validators.required],
      estadoinventario:[1],
      asignadoinventario:[0]
    })
  }

  ngOnInit(): void {
    //Manejo de las alertas del formulario
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
    //Fin del manejo de las alertas del formulario
    //Cargando todas las compras
    this.getAllCompras();

  }

  async getAllCompras() {
    try {
      this.compras = await this._apiCompras.getData();
    } catch (error) {
      console.log(error);
    }
  }

  async getAllDetallesBy(idcompra: number) {
    try {
      this.detalles = await this._apiDetalles.getDataByEstado(idcompra);
      if (this.detalles.length == 0) {
        this.messageType = "warning";
        this._success.next("La compra seleccionado no cuenta con ningun detalle, o los detalles ya han sido inventariados");
        this.seleccionado = false;
      }
    } catch (error) {
      console.log(error.value);
    }
  }

  //Modal
  open(content: any) {
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

  //post hotel con async/await
  async nuevoElemento() {
    console.log(this.datos.value);
    if (this.datos.valid) {
      try {
        this.btnLoading = false;
        let id = Number(this.datos.get('iddetalle').value);
        this.datos.get('iddetalle').setValue(id);
        await this._apiRest.postData(this.datos.value, this.cantidadDetalle());
        this.messageType = "success";
        this._success.next("Registro almacenado exitosamente !!!");
        this.datos.get('iddetalle').setValue('');        
        this.seleccionado = false;        
        //Enviado mensaje de actualización del listado
        this.renderSon.emit("true");
        this.btnLoading = true;
      } catch (error) {
        this.btnLoading = true;
        this.messageType = "danger";
        this._success.next("Ocurrió un error: " + error);
      }
    } else {
      this.btnLoading = true;
      this.messageType = "warning";
      this._success.next("Complete los campos que son obligatorios");
    }

  }

  cantidadDetalle(): number {
    let cantidad: number = 0;
    this.detalles.forEach(item => {
      if (Number(this.datos.get('iddetalle').value) == Number(item.iddetalle)) {
        cantidad = item.cantidaddetalle;
      }
    });
    return cantidad;
  }

  ecompra(e: any): void {
    if (e.target.value == "0") {
      this.messageType = "danger";
      this._success.next("Seleccione un elemento...");
      this.seleccionado = false;
    } else {
      this.getAllDetallesBy(Number(e.target.value));
      this.seleccionado = true;
    }
  }

}
