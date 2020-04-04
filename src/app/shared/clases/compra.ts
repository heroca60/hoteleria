import { Icompra } from '../interfaces/icompra';

export class Compra implements Icompra {
    idcompra: number;
    idhotel: number;
    proveedorcompra: string;
    totalcompra: number;
    fechacompra: any;
    observacioncompra: string;
    seriecompra: string;
    numerocompra: number;
    estadocompra: number;

    constructor(){
        
    }
}
