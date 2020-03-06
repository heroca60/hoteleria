import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { HotelService } from '../../../shared/servicios/hotel.service';


@Component({
  selector: 'app-modificar-hotel',
  templateUrl: './modificar-hotel.component.html',
  styleUrls: ['./modificar-hotel.component.css']
})
export class ModificarHotelComponent implements OnInit {
  public isCollapsed = false;
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
      idhotel: [''],
      nombrehotel: ['', Validators.required],
      direccionhotel: ['', Validators.required],
      representantehotel: ['', Validators.required],
      estadohotel: ['']
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

