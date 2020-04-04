import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { ModuloService } from 'src/app/shared/servicios/modulo.service';
import { ConfiguracionService } from 'src/app/shared/servicios/configuracion.service';


@Component({
  selector: 'app-crear-modulo',
  templateUrl: './crear-modulo.component.html',
  styleUrls: ['./crear-modulo.component.css']
})
export class CrearModuloComponent implements OnInit {
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
  constructor(
    //inyectando formulario reactivo para validación y captura de datos
    private formBuilder: FormBuilder,
    //inyectando apiREST
    private _apiRest: ModuloService,
    //modal
    private modalService: NgbModal,
    //configuracion
    //servicio de configuración general
    private _config: ConfiguracionService
  ) {
    //Formulario
    this.datos = this.formBuilder.group({
      idhotel: [this._config.hotel.idhotel],
      nombremodulo: ['', Validators.required]
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

  //post hotel con async/await
  async nuevoElemento() {
    if (this.datos.valid) {
      try {        
        this.btnLoading = false;
        await this._apiRest.postData(this.datos.value);
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
      this.btnLoading = true;
      this.messageType = "warning";
      this._success.next("Complete los campos que son obligatorios");
    }

  }

}
