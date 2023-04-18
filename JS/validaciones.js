//PARA REUTILIZAR CODIGO
export function valida(input){ //Funcion para recibir inputs y va estaer vinculado con el archivo app.js
    const tipoDeInput = input.dataset.tipo; //obtenemos la conexion de todos los datas y el "tipo" es el data attributes
    //Ademas cuabdo del archivo app.js mande el input a la funcion valida, esta funcion reconocera si es del input data-tipo
    if(validadores[tipoDeInput]){ //Verofocar si en validadores existe un tipo de input
        validadores[tipoDeInput](input);
    }
}

const validadores = { //funcion que va a recibir el valor del elemmento data attributtes "Nacimiento"
    nacimiento: input => validarNacimiento(input), 
};

//------------------------------------------------------------------------------------------------------------------------------------
//const inputNacimiento = document.querySelector("#birth"); // 1 Seleecionamos el id del elemento donde estara la fecha

    //inputNacimiento.addEventListener("blur", (evento) => { //Creamos un listener tipo blur(cuando ya no este selecionado) 
    //validarNacimiento(evento.target); //La accion sera un evento donde se va a capturar el elemnto input y lo manda a la funcion
   // console.log(event.target);
//})

function validarNacimiento(input){ // Validamos si el cleinaddte es mayor de edad
    const fechaCliente = new Date (input.value); //convertimos el elemento captura en unicament euna fecha
    //console.log(input.value);
    let mensaje = ""; //Emitimos un mensaje en blanco que estara siempre  hasta que se cumpla la siguiente condicion
    if(!mayorDeEdad(fechaCliente)){ //Antes de llegar a este if es necesario crear una funcion que valide que tenemos 18
        mensaje = "Debes de tener 18 años de edad"; //se emite el mensaje si se valida la condicion
    }

    input.setCustomValidity(mensaje); //Comando para emitir un mensaje tipo title HTML
}

function mayorDeEdad(fecha){ //Fucnion que valida que la fecha actual es mayor a la diferencia entre la actual y la ingresada
    const fechaActual = new Date(); //Para generar la fecha actual
    //Fecha actual le sumamos 18 años.
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18 /*Aqui sumamos 18 años */, fecha.getUTCMonth(), fecha.getUTCDate());
    return diferenciaFechas <= fechaActual; //Retornamos un tipo booleano verdadero o falso. Se envia a la condicion if.
    
}