import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { InicioComponent } from './inicio/inicio.component';
import { HotelComponent } from './admin/hotel/hotel.component';
import { ArticuloComponent } from './admin/articulo/articulo.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ComprasComponent } from './admin/compras/compras.component';
import { ModuloComponent } from './admin/modulo/modulo.component';
import { TipoComponent } from './admin/tipo/tipo.component';
import { HabitacionComponent } from './admin/habitacion/habitacion.component';
import { ServicioComponent } from './admin/servicio/servicio.component';
import { HabitacionservicioComponent } from './admin/habitacionservicio/habitacionservicio.component';
import { InventarioComponent } from './admin/inventario/inventario.component';


const routes: Routes = [
  {
    path: 'admin', component: AdminComponent
  },
  {
    //path: 'dashboard/:nombre', component: DashboardComponent
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'admin/hotel', component: HotelComponent
  },
  {
    path: 'articulos', component: ArticuloComponent
  },
  {
    path: 'compras', component: ComprasComponent
  },
  {
    path: 'modulos', component: ModuloComponent
  },
  {
    path: 'tipos', component: TipoComponent
  },
  {
    path: 'servicios', component: ServicioComponent
  },
  {
    path: 'habitaciones', component: HabitacionComponent
  },
  {
    path: 'habitacionservicios', component: HabitacionservicioComponent
  },
  {
    path: 'inventarios', component: InventarioComponent
  },
  {
    path: '**', component: InicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
