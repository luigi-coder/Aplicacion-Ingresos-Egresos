class Ingreso extends Dato{

    static contadorIngresos = 0;

    constructor(descripcion,valor){
        super(descripcion,valor);
        this._id = ++Ingreso.contadorIngresos; // El primer valor tendra el valor de 1
    }
    get id(){ 
        return this._id
    }
}
