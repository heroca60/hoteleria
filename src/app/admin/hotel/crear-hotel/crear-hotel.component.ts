import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { HotelService } from '../../../shared/servicios/hotel.service';


@Component({
  selector: 'app-crear-hotel',
  templateUrl: './crear-hotel.component.html',
  styleUrls: ['./crear-hotel.component.css']
})
export class CrearHotelComponent implements OnInit {
  public isCollapsed = true;
  private _success = new Subject<string>();

  //*************** */
  relay:any;
  response:any;

  //Variables para el mensaje de transacción
  staticAlertClosed = false;
  successMessage: string;
  messageType: string;



  //Datos del formulario
  datos: any;
  constructor(
    //inyectando formulario reactivo para validación y captura de datos
    private formBuilder: FormBuilder,
    //inyectando apiREST
    private _apiRest: HotelService
  ) {
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


  //post hotel con async/await
  async nuevoElemento() {
    if (this.datos.valid) {
      try {
        await this._apiRest.postElemento(this.datos.value);
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
