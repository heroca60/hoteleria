import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { InicioComponent } from './inicio/inicio.component';
import { HotelComponent } from './admin/hotel/hotel.component';
import { ArticuloComponent } from './admin/articulo/articulo.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ComprasComponent } from './admin/compras/compras.component';


const routes: Routes = [
  {
    path: 'admin', component: AdminComponent
  },
  {
    path: 'dashboard/:nombre', component: DashboardComponent
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
    path: '**', component: InicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
