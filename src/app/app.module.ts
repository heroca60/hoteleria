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
    ListarArticuloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HotelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
