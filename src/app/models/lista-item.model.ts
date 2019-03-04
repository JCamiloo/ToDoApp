export class ListaItem{
    desc: string;
    completado: boolean;

    constructor(des:string){
        this.desc = des;
        this.completado = false;
    }
}