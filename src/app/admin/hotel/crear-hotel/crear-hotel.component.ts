import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { HotelService } from '../../../shared/servicios/hotel.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-crear-hotel',
  templateUrl: './crear-hotel.component.html',
  styleUrls: ['./crear-hotel.component.css']
})
export class CrearHotelComponent implements OnInit {  
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
  constructor(
    //inyectando formulario reactivo para validación y captura de datos
    private formBuilder: FormBuilder,
    //inyectando apiREST
    private _apiRest: HotelService,
    //modal
    private modalService: NgbModal
  ) {
    //Formulario
    this.datos = this.formBuilder.group({
      nombrehotel: ['', Validators.required],
      direccionhotel: ['', Validators.required],
      representantehotel: ['', Validators.required],
      estadohotel: [1]
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
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
        await this._apiRest.postData(this.datos.value);
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
