import { valida } from "./validaciones.js"; //importamos la funcion valida 

const input = document.querySelectorAll("input"); //seleeciona todo los inputs del HTML

input.forEach(input =>{ 
    input.addEventListener("blur", (input) =>{ //Luego de seleccionar los inputs se le va agregar 
        //el Listener tipo blur y un evento input
        valida(input.target);//Y dentro de ese evento sera enviar ese valor
        // a la funcion valida del documento de validaciones despues de perder el foco
    });
});
