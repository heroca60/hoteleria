import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { AdminComponent } from './admin/admin.component';
import { HotelComponent } from './admin/hotel/hotel.component';
import { InicioComponent } from './inicio/inicio.component';
import { CrearHotelComponent } from './admin/hotel/crear-hotel/crear-hotel.component';
import { ListarHotelComponent } from './admin/hotel/listar-hotel/listar-hotel.component';

// HttpClient module for RESTful API
import { HttpClientModule } from '@angular/common/http';
import { HotelService } from './shared/servicios/hotel.service';
import { ArticuloComponent } from './admin/articulo/articulo.component';
import { CrearArticuloComponent } from './admin/articulo/crear-articulo/crear-articulo.component';
import { ListarArticuloComponent } from './admin/articulo/listar-articulo/listar-articulo.component';
import { ModificarHotelComponent } from './admin/hotel/modificar-hotel/modificar-hotel.component';
import { CrearAdminComponent } from './admin/crear-admin/crear-admin.component';
import { ListarAdminComponent } from './admin/listar-admin/listar-admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ArticuloService } from './shared/servicios/articulo.service';
import { ComprasComponent } from './admin/compras/compras.component';
import { CrearComprasComponent } from './admin/compras/crear-compras/crear-compras.component';
import { ListarComprasComponent } from './admin/compras/listar-compras/listar-compras.component';
import { CompraService } from './shared/servicios/compra.service';
import { DetalleService } from './shared/servicios/detalle.service';


@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    AdminComponent,
    HotelComponent,
    InicioComponent,
    CrearHotelComponent,
    ListarHotelComponent,
    ArticuloComponent,
    CrearArticuloComponent,
    ListarArticuloComponent,
    ModificarHotelComponent,
    CrearAdminComponent,
    ListarAdminComponent,
    DashboardComponent,
    ComprasComponent,
    CrearComprasComponent,
    ListarComprasComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    HotelService, 
    ArticuloService, 
    CompraService,
    DetalleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
