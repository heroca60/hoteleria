import { Injectable } from '@angular/core';
import { Ihotel } from '../interfaces/ihotel';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  textoBotonGuardar: string = "Guardar"
  textoBotonActualizar: string = "Actualizar"
  iconoCrear: string = "add_circle"
  iconoLeer: string = "visibility"
  iconoActualizar: string = "settings"
  iconoEliminar: string = "delete"
  iconoListar: string = "list"
  hotel: Ihotel;
  constructor() { }
}
