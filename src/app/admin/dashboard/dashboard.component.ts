import {
  Component,
  OnInit,
  ViewEncapsulation
}
  from
  '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfiguracionService } from 'src/app/shared/servicios/configuracion.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,  
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  nombre: string;
  direccion: string;
  disabled = false;

  constructor(
    private route: ActivatedRoute,
    private _config: ConfiguracionService
  ) {
    this.nombre = this.route.snapshot.params.nombre;
    this.direccion = this.route.snapshot.params.direccion;
  }

  ngOnInit(): void {
    
  }


}
