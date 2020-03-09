import { Component, OnInit, ViewChild } from '@angular/core';
import { ListarAdminComponent } from './listar-admin/listar-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Ihotel } from '../shared/interfaces/ihotel';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild(ListarAdminComponent) componenteListar: ListarAdminComponent;  

  constructor(
  ) { }

  ngOnInit(): void {
  }

  render(val: string): void {
    this.componenteListar.render();
  }
  
}
