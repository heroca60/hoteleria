import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { HabitacionService } from 'src/app/shared/servicios/habitacion.service';
import { NgbModal, ModalDismissReasons, NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { ModuloService } from 'src/app/shared/servicios/modulo.service';
import { Imodulo } from 'src/app/shared/interfaces/imodulo';
import { Itipo } from 'src/app/shared/interfaces/itipo';
import { TipoService } from 'src/app/shared/servicios/tipo.service';
import { Iservicio } from 'src/app/shared/interfaces/iservicio';
import { ServicioService } from 'src/app/shared/servicios/servicio.service';
import { ConfiguracionService } from 'src/app/shared/servicios/configuracion.service';
import { Iviewinventario } from 'src/app/shared/interfaces/iviewinventario';
import { InventarioService } from 'src/app/shared/servicios/inventario.service';
import { Iinventario } from 'src/app/shared/interfaces/iinventario';
import { ListarHabitacionComponent } from '../listar-habitacion/listar-habitacion.component';

@Component({
  selector: 'app-crear-habitacion',
  templateUrl: './crear-habitacion.component.html',
  styleUrls: ['./crear-habitacion.component.css']
})


export class CrearHabitacionComponent implements OnInit {
  modulos: Imodulo[] = [];
  tipos: Itipo[] = [];

  servicios: Iservicio[] = [];
  serviciosSeleccionados: Iservicio[];
  //serviciosExtras: Iservicio[];

  inventarios: Iviewinventario[] = [];
  inventariosSeleccionados: Iviewinventario[];
  inventariosreales: Iinventario[];
  //inventariosExtras: Iviewinventario[];


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
  formservicios: any;
  forminventarios: any;

  //Evento para el padre... post exitoso render del list.
  @Output() renderSon = new EventEmitter<string>();

  //Control del boton carga...
  btnLoading: boolean = true;

  //elementos seleccionados
  moduloseleccionado: string;
  tiposeleccionado: string;

  ie: string;
  ic: string;
  it: string;

  @ViewChild(ListarHabitacionComponent) listar: ListarHabitacionComponent;
  
  constructor(  //inyectando formulario reactivo para validación y captura de datos
    private formBuilder: FormBuilder,
    //inyectando apiREST
    private _apiRest: HabitacionService,
    //obteniendo los modulos del hotel
    private _modulos: ModuloService,
    //obteniendo los tipos de habitaciones
    private _tipos: TipoService,
    //obteniendo los servicios del hotel
    private _servicios: ServicioService,
    //obteniendo la vista de inventarios
    private _inventarios: InventarioService,
    //modal
    private modalService: NgbModal,
    //inyectando para el tab
    config: NgbNavConfig,
    private _config: ConfiguracionService

  ) {
    this.datos = this.formBuilder.group({
      idmodulo: ['', Validators.required],
      idtipo: ['', Validators.required],
      preciohabitacion: ['', Validators.required],
      estadohabitacion: [0, Validators.required],
      servicios: [],
      inventarios: []
    })

    this.formservicios = this.formBuilder.group({
      idservicio: ['']
    })

    this.forminventarios = this.formBuilder.group({
      idinventario: ['']
    })

    this.moduloseleccionado = "";
    this.tiposeleccionado = "";

    this.ie = this._config.iconoEliminar;
    this.ic = this._config.iconoCrear;
    this.it = this._config.iconoCargarTodos;

    // customize default values of navs used by this component tree
    config.destroyOnHide = false;
    config.roles = false;
  }

  ngOnInit(): void {
    this.getAllModulos();
    this.getAllTipos();
    this.getAllServicios();
    this.getAllInventarios();
    //Manejo de las alertas del formulario
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
    //Fin del manejo de las alertas del formulario

    //Inicializando los array en blanco
    this.serviciosSeleccionados = [];
    this.inventariosreales = [];
    this.inventariosSeleccionados = [];
      
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

  async getAllServicios() {
    try {
      //obtenemos todos los servicios del hotel
      this.servicios = await this._servicios.getData();
      //Evaluamos si existen registros de tipos para ese hotel
      if (this.servicios.length == 0) {
        this.messageType = "danger";
        this._success.next("No es posible agregar un servicio al registro que se intenta crear.  Es necesario crear los servicios antes de continuar con este procedimiento.");
      }
    } catch (error) {
      alert('Ocurrió un error: ' + error);
    }
  }

  async getAllInventarios() {
    try {
      //obtenemos todos los servicios del hotel
      this.inventarios = await this._inventarios.getDataActiveNoAsig();
      //Evaluamos si existen registros de tipos para ese hotel
      if (this.servicios.length == 0) {
        this.messageType = "danger";
        this._success.next("No es posible asignar parte del inventario al registro que se intenta crear.  Es necesario crear el inventario a partir de los gastos realizados.");
      }
    } catch (error) {
      alert('Ocurrió un error: ' + error);
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

  //post articulo con async/await
  async nuevoElemento() {
    if (this.datos.valid) {
      try {
        //convirtiendo valores string a number
        let idm: number = Number(this.datos.get('idmodulo').value)
        let idt: number = Number(this.datos.get('idtipo').value)
        this.datos.controls['idmodulo'].setValue(idm);
        this.datos.controls['idtipo'].setValue(idt);
        //-----------------------------------
        this.btnLoading = false;
        //agregando los servicios y complementos a la habitación
        this.datos.get('servicios').setValue(this.serviciosSeleccionados);
        this.datos.get('inventarios').setValue(this.inventariosreales);
        await this._apiRest.postElemento(this.datos.value);
        this.messageType = "success";
        this._success.next("Registro almacenado exitosamente !!!");
        this.datos.reset();
        //Limpiando los arrays
        this.serviciosSeleccionados = [];
        this.inventariosSeleccionados = [];
        this.inventariosreales = [];
        //Enviado mensaje de actualización del listado
        this.renderSon.emit("true");
        //rehabilitando el boton
        this.btnLoading = true;
        //Cargando nuevamente los inventarios no asignados
        this.getAllInventarios();
        this.datos.controls['estadohabitacion'].setValue(0);
      } catch (error) {
        this.btnLoading = true;
        this.messageType = "danger";
        this._success.next("Ocurrió un error: " + error.code);
      }
    } else {
      this.messageType = "warning";
      this._success.next("Complete los campos que son obligatorios");
    }
  }

  eliminarServicio(id: number): void {
    let i = 0;
    this.serviciosSeleccionados.forEach(item => {
      if (id === item.idservicio) {
        this.serviciosSeleccionados.splice(i, 1);
      }
      i++;
    });
  }

  eliminarInventario(id: number): void {
    let i = 0;
    this.inventariosSeleccionados.forEach(item => {
      if (id === item.idinventario) {
        this.inventariosSeleccionados.splice(i, 1);
      }
      i++;
    });
    this.inventariosreales.forEach(item => {
      if (id === item.idinventario) {
        this.inventariosreales.splice(i, 1);
      }
      i++;
    });
  }

  /*Agrega el servicio a la lista de seleccionados para luego ser guardados
  La carga se realiza mediante la selección de un elemento en el Select del html*/
  cargarServicio(e: any): void {
    this.servicios.forEach(element => {
      if (e.target.value == element.idservicio && this.verificadorServicio(e.target.value)) {
        this.serviciosSeleccionados.push(element);
      }
    });
  }

  /*Agrega el inventario a la lista de seleccionados para luego ser guardados
  La carga se realiza mediante la selección de un elemento en el Select del html*/
  cargarInventario(e: any): void {
    this.inventarios.forEach(element => {
      if (e.target.value == element.idinventario && this.verificadorInventario(e.target.value)) {
        this.inventariosSeleccionados.push(element);
        this.inventariosreales.push(
          {
            'idinventario': element.idinventario,
            'idhotel': element.idhotel,
            'iddetalle': element.idhotel,
            'estadoinventario': element.estadoinventario,
            'asignadoinventario': 1
          }
        );
      }
    });
  }



  verificadorServicio(e: any): boolean {
    let res = true;
    this.serviciosSeleccionados.forEach(element => {
      if (e == element.idservicio) {
        res = false;
      }
    });
    return res;
  }

  verificadorInventario(e: any): boolean {
    let res = true;
    this.inventariosSeleccionados.forEach(element => {
      if (e == element.idinventario) {
        res = false;
      }
    });
    return res;
  }

  //Agrega todos los registros al arreglo de servicios seleccionados
  agregarTodos(): void {
    this.serviciosSeleccionados = [];
    this.servicios.forEach(item => {
      this.serviciosSeleccionados.push(item);
    })
  }
}
