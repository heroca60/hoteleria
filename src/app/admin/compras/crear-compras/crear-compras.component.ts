import {
  Component,
  OnInit
}
  from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { CompraService } from 'src/app/shared/servicios/compra.service';
import { debounceTime } from 'rxjs/operators';
import { ModalDismissReasons, NgbModal, NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfiguracionService } from 'src/app/shared/servicios/configuracion.service';
import { Idetalle } from 'src/app/shared/interfaces/idetalle';

@Component({
  selector: 'app-crear-compras',
  templateUrl: './crear-compras.component.html',
  styleUrls: ['./crear-compras.component.css']
})
export class CrearComprasComponent implements OnInit {
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

  //Control del boton carga...
  btnLoading: boolean = true;

  constructor(
    //inyectando formulario reactivo para validación y captura de datos
    private formBuilder: FormBuilder,
    //inyectando apiREST
    private _apiRest: CompraService,
    //modal
    private modalService: NgbModal,
    //configuracion general
    private _config: ConfiguracionService,
    //tab
    config: NgbNavConfig
  ) {
    //Formulario
    this.datos = this.formBuilder.group({
      idhotel: [this._config.hotel.idhotel],
      proveedorcompra: ['', Validators.required],
      totalcompra: ['', Validators.required],
      fechacompra: ['', Validators.required],
      observacioncompra: [''],
      seriecompra: ['', Validators.required],
      numerocompra: ['', Validators.required],
      estadocompra: [0]
    });
    // customize default values of navs used by this component tree
    config.destroyOnHide = false;
    config.roles = false;
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
    if (this.datos.valid) {
      try {
        this.btnLoading = false;
        //await this._apiRest.postData(this.datos.value);
        this.messageType = "success";
        this._success.next("Registro almacenado exitosamente !!!");
        this.datos.reset();
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
}