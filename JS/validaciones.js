//PARA REUTILIZAR CODIGO
export function valida(input){ //Funcion para recibir inputs y va estaer vinculado con el archivo app.js
    const tipoDeInput = input.dataset.tipo; //obtenemos la conexion de todos los datas y el "tipo" es el data attributes
    //Ademas cuabdo del archivo app.js mande el input a la funcion valida, esta funcion reconocera si es del input data-tipo
    if(validadores[tipoDeInput]){ //Verofocar si en validadores existe un tipo de input
        validadores[tipoDeInput](input);
    }
    //CON ESTO HACEMOS QUE SE MARQUE CON ROJO LOS INPUTS QUE ESTEN VACIOS LUEGO DE HACER UN FOCUS
    //console.log(input.parentElement); //Para ver el eleento padre de mis input del HTMLM
    if(input.validity.valid){ //Comando Validity hace que veamos toda la config del elemento pero en este caso nos interesa el "valid"
        input.parentElement.classList.remove("input-container--invalid") //ClasssList para remover una clase cuando "valid" es true
        input.parentElement.querySelector(".input-message-error").innerHTML = " "; //Insertamos al DOM del HTML un espacio vacio
    }else{
        input.parentElement.classList.add("input-container--invalid") //ClassList para agregar una clase cuando el "valid" es false
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}
    const tipoDeErrores = ["valueMissing","typeMismatch","patternMismatch","customError"];
    //CONFIGURANDO MENSAJES DE ERROR PARA CADA CAMPO NECESARIO
    const mensajesDeError = { //Funcionn que emitira eroress
        //trabajamos con los id de cada elemento.
        nombre:{
            valueMissing: "EL CAMPO NOMBRE NO PUEDE ESTAR VACIO" //Campo del validity cuando quitas el focus del campo sin llenar
        },
        email: {
            valueMissing: "EL CAMPO CORREO NO PUEDE ESTAR VACIO",
            typeMismatch: "EL CORREO NO ES VALIDO" //Campo del validity cuando te equivocas o no es valido el correo
        },
        
        password: {
            valueMissing: "EL CAMPO PASSWORD NO PUEDE ESTAR VACIO",
            patternMissmatch: "Al menos una letra y un número" //Caudno no cumple el pattern de la contraseña
        },
        nacimiento: {
            valueMissing: "EL CAMPO FECHA NO PUEDE ESTAR VACIO",
            customError: "DEBES DE TENER 18 AÑOS" //Cuando valida que no tenes 18 años.
        },
    };

const validadores = { //funcion que va a recibir el valor del elemmento data attributtes "Nacimiento"
    nacimiento: input => validarNacimiento(input), 
};

//EMITIR EL TEXTO DE ERROR
function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach((error) => {// funcion que verifica cada uno de los campos del arreglo
        if(input.validity[error]){ //Si es verdadero el valid de cada tipo de error
            console.log(error); //Verificar que tipo d error esta leyendo
            console.log(input.validity[error]); //Verificando si el valid es true o false
            console.log(mensajesDeError[tipoDeInput][error]); //Verificamos que si esta leyendo el mensaje de error
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}
//------------------------------------------------------------------------------------------------------------------------------------
//const inputNacimiento = document.querySelector("#birth"); // 1 Seleecionamos el id del elemento donde estara la fecha

    //inputNacimiento.addEventListener("blur", (evento) => { //Creamos un listener tipo blur(cuando ya no este selecionado) 
    //validarNacimiento(evento.target); //La accion sera un evento donde se va a capturar el elemnto input y lo manda a la funcion
   // console.log(event.target);
//})

function validarNacimiento(input){ // Validamos si el clientete es mayor de edad
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