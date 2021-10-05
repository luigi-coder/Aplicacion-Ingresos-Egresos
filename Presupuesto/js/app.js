const ingresos = [
 
]

const egresos = [
   
]

let cargarApp = ()=>{
    
    cargarCabecero()
    cargarIngresos()
    cargarEgresos()
}

let totalIngresos = ()=>{
    let totalIngreso = 0;
    if(localStorage.getItem('ingresos')!==null){
        let ingresosLocal = JSON.parse(localStorage.getItem('ingresos'));
        for( let ingreso of ingresosLocal ){
            totalIngreso += ingreso._valor
        }
    }/* else {
        alert("No hay INGRESOS en el localStorage");
    } */
    return totalIngreso;
}

let totalEgresos = ()=>{
    let totalEgreso = 0;
    if(localStorage.getItem('egresos')!== null){
        let egresosLocal = JSON.parse(localStorage.getItem('egresos'));
        for( let egreso of egresosLocal ){
            totalEgreso += egreso._valor
        }
    }/* else {
        alert("No hay EGRESOS en el localStorage")
    } */
    return totalEgreso;
}

let cargarCabecero = ()=>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos(); 
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

// Internacionalizacion 
const formatoMoneda = (valor)=>{
    return valor.toLocaleString('en-US',{style:'currency', currency:'USD', minimumFractionDigits:2});
}
const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('en-US',{style:'percent',minimumFractionDigits:2});
}

const cargarIngresos = ()=>{
    let ingresosHTML = '';
    if(localStorage.getItem('ingresos')!== null){
        let ingresosLocal = JSON.parse(localStorage.getItem('ingresos'));
        for (let ingreso of ingresosLocal) {
            ingresosHTML += crearIngresoHTML(ingreso);
        }
    }else {
        ingresosHTML += 'No hay ingresos guardados'
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso)=>{

    let ingresoHTML = 
    `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso._descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+${formatoMoneda(ingreso._valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick='eliminarIngreso(${ingreso._id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `
    return ingresoHTML;
}

const cargarEgresos = ()=>{
    let egresosHTML = '';
    if(localStorage.getItem('egresos')!==null){
        let egresosLocal = JSON.parse(localStorage.getItem('egresos'));
        for (let egreso of egresosLocal) {
            egresosHTML += crearEgresoHTML(egreso);
        }
    }else {
        egresosHTML += 'No hay egresos guardados';
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso)=>{

    let egresosHTML =
    `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso._descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">-${formatoMoneda(egreso._valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(egreso._valor/totalEgresos())}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick='eliminarEgreso(${egreso._id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `
    return egresosHTML;
}
/*
// ELIMINAR INGRESOS
const eliminarIngreso = (id)=>{
    let ingresosLocal = JSON.parse(localStorage.getItem('ingresos'))
    let indiceEliminar = ingresosLocal.findIndex((ingreso)=>{
        return ingreso._id === id;
    })
    ingresosLocal.splice(indiceEliminar,1);
    localStorage.setItem('ingresos',JSON.stringify(ingresosLocal))
    cargarCabecero()
    cargarIngresos()
}
// ELIMINAR EGRESOS
const eliminarEgreso = (id)=>{
    let egresosLocal = JSON.parse(localStorage.getItem('egresos'))
    let indiceEliminar = egresosLocal.findIndex((egreso)=>{
        return egreso.id === id;
    })
    egresosLocal.splice(indiceEliminar,1);
    localStorage.setItem('egresos',JSON.stringify(egresosLocal))
    cargarCabecero()
    cargarEgresos()
} */

const agregarDato = ()=>{
    let formulario = document.forms['formulario'];
    let tipo = formulario['tipo'];
    let descripcion = formulario['descripcion'];
    let valor = formulario['valor'];

    if(descripcion.value !== '' && valor.value !== ''){
        if(localStorage.getItem('ingresos')===null || localStorage.getItem('egresos')=== null){
            if(tipo.value === 'ingreso'){
                ingresos.push(new Ingreso(descripcion.value, +valor.value));
                localStorage.setItem('ingresos',JSON.stringify(ingresos));
                cargarCabecero()
                cargarIngresos()
            }else if(tipo.value === 'egreso'){
                egresos.push(new Egreso(descripcion.value, +valor.value));
                localStorage.setItem('egresos',JSON.stringify(egresos));
                cargarCabecero()
                cargarEgresos()
            }
        }else {
            let ingresosLocal = JSON.parse(localStorage.getItem('ingresos'));
            ingresosLocal.push(new Ingreso(descripcion.value, +valor.value));
            localStorage.setItem('ingresos',JSON.stringify(ingresosLocal))

            let egresoLocal = JSON.parse(localStorage.getItem('egreso'));
            egresoLocal.push(new Egreso(descripcion.value, +valor.value));
            localStorage.setItem('egreso', JSON.stringify(egresoLocal));
        }
    }
    document.getElementById('formulario').reset();
    /* if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero()
            cargarIngresos()
        }else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero()
            cargarEgresos()
        }
    } */
}