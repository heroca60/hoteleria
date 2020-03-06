import {
  Component,
  OnInit
} from '@angular/core';
import { Observable, Subject } from 'rxjs';



@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  public crear: boolean = true;


  constructor() { }

  ngOnInit(): void {

  }

  cambiarComponente(val:boolean) {
    console.log(this.crear);
    this.crear = val;
    console.log(this.crear);
  }

}
