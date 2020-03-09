import {
  Component,
  OnInit,
  Output,
  EventEmitter
}
  from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { ArticuloService } from '../../../shared/servicios/articulo.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-crear-articulo',
  templateUrl: './crear-articulo.component.html',
  styleUrls: ['./crear-articulo.component.css']  
})
export class CrearArticuloComponent implements OnInit {
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

  constructor(
    //inyectando formulario reactivo para validación y captura de datos
    private formBuilder: FormBuilder,
    //inyectando apiREST
    private _apiRest: ArticuloService,
    //modal
    private modalService: NgbModal
  ) {
    this.datos = this.formBuilder.group({
      nombrearticulo: ['', Validators.required],
      descripcionarticulo: ['', Validators.required]
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

  //post articulo con async/await
  async nuevoElemento() {
    if (this.datos.valid) {
      try {
        await this._apiRest.postElemento(this.datos.value);
        this.messageType = "success";
        this._success.next("Registro almacenado exitosamente !!!");
        this.datos.reset();
        //Enviado mensaje de actualización del listado
        this.renderSon.emit("true");
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
