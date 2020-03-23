import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Subject, Observable, merge } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { HabitacionService } from 'src/app/shared/servicios/habitacion.service';
import { NgbModal, ModalDismissReasons, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { ModuloService } from 'src/app/shared/servicios/modulo.service';
import { Imodulo } from 'src/app/shared/interfaces/imodulo';
import { Itipo } from 'src/app/shared/interfaces/itipo';
import { TipoService } from 'src/app/shared/servicios/tipo.service';

@Component({
  selector: 'app-crear-habitacion',
  templateUrl: './crear-habitacion.component.html',
  styleUrls: ['./crear-habitacion.component.css']
})
export class CrearHabitacionComponent implements OnInit {
  modulos: Imodulo[] = [];
  tipos: Itipo[] = [];

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

  //Evento para el padre... post exitoso render del list.
  @Output() renderSon = new EventEmitter<string>();

  //Control del boton carga...
  btnLoading: boolean = true;

  //elementos seleccionados
  moduloseleccionado: string;
  tiposeleccionado: string;
  

  constructor(  //inyectando formulario reactivo para validación y captura de datos
    private formBuilder: FormBuilder,
    //inyectando apiREST
    private _apiRest: HabitacionService,
    //obteniendo los modulos del hotel
    private _modulos: ModuloService,
    //obtenuendo los tipos de habitaciones
    private _tipos: TipoService,
    //modal
    private modalService: NgbModal
  ) {
    this.datos = this.formBuilder.group({
      idmodulo: ['', Validators.required],
      idtipo: ['', Validators.required],
      preciohabitacion: ['', Validators.required],
      estadohabitacion: [0, Validators.required]
    })
    this.moduloseleccionado = "";
    this.tiposeleccionado = "";
  }

  ngOnInit(): void {    
    this.getAllModulos();
    this.getAllTipos();
    //Manejo de las alertas del formulario
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
    //Fin del manejo de las alertas del formulario
  }

  async getAllModulos() {
    try {
      //obtenemos todos los modulos del hotel
      this.modulos = await this._modulos.getData();
      //Evaluamos si existen registros de modulos para ese hotel
      if (this.modulos.length == 0) {        
        this.messageType = "danger";
        this._success.next("No es posible crear un nuevo registro de habitación si no se cuentan con registros de módulo.  Es necesario crear un módulo antes de continuar con este procedimiento.");
      }
    } catch (error) {
      alert('Ocurrió un error: ' + error);
    }
  }

  async getAllTipos() {
    try {
      //obtenemos todos los modulos del hotel
      this.tipos = await this._tipos.getData();
      //Evaluamos si existen registros de tipos para ese hotel
      if (this.tipos.length == 0) {        
        this.messageType = "danger";
        this._success.next("No es posible crear un nuevo registro de habitación si no se cuentan con registros de tipos.  Es necesario crear un tipo antes de continuar con este procedimiento.");
      }
    } catch (error) {
      alert('Ocurrió un error: ' + error);
    }
  }

  //Modal
  open(content: any) {
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
        this.btnLoading = false;
        await this._apiRest.postElemento(this.datos.value);
        this.messageType = "success";
        this._success.next("Registro almacenado exitosamente !!!");
        this.datos.reset();
        //Enviado mensaje de actualización del listado
        this.renderSon.emit("true");
        this.btnLoading = true;
      } catch (error) {
        this.btnLoading = true;
        this.messageType = "danger";
        this._success.next("Ocurrió un error: " + error);
      }
    } else {
      this.messageType = "warning";
      this._success.next("Complete los campos que son obligatorios");
    }
  }


  emodulo(e: any): void {
    this.moduloseleccionado = ""
    this.modulos.forEach(element => {
      if (element.idmodulo == e.target.value) {
        this.moduloseleccionado = element.nombremodulo
      }
    });
  }

  etipo(e: any): void {
    this.tiposeleccionado = ""
    this.tipos.forEach(element => {
      if (element.idtipo == e.target.value) {
        this.tiposeleccionado = element.nombretipo
      }
    });
  }

}
