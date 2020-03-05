import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { InicioComponent } from './inicio/inicio.component';
import { HotelComponent } from './admin/hotel/hotel.component';
import { ArticuloComponent } from './admin/articulo/articulo.component';


const routes: Routes = [
  {
    path: 'admin', component: AdminComponent
  },
  {
    path: 'admin/hotel', component: HotelComponent
  },
  {
    path: 'admin/articulo', component:ArticuloComponent
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
