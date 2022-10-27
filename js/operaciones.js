import { destroyResultados } from "./authorize.js";
import { redirectToCategories, redirectToInforme} from "./routes.js"
import { cambiarSignoOperacion, comprobarRespuesta, cambiarNumerosOperacion, iniciarTiempo, conteoEjercicios } from "./aprendo.js";

//configuracion
const minutos = 0;
const segundos = 16;
const ejercicios = 15;
//configuracion

let myInterval = 0;

//para cambiar los numero de forma aleatoria la 
//primera vez que carga la pagina
window.onload = function () {
    const signo = cambiarSignoOperacion();
    cambiarNumerosOperacion(signo);
    myInterval = iniciarTiempo(minutos, segundos, ejercicios)
    conteoEjercicios(0, ejercicios);
}

//validacion del boton enviar
const btnEnviar = document.getElementById("btnEnviar");
btnEnviar.addEventListener("click", e => {

    clearInterval(myInterval);
    if(comprobarRespuesta(ejercicios)){
        redirectToInforme();
    }
    myInterval = iniciarTiempo(minutos, segundos, ejercicios)
})

const btnSalir = document.getElementById("btnSalir");
btnSalir.addEventListener('click', e => {
    document.getElementById("modalOperaciones").style.display = "initial";
});

const btnAceptar = document.getElementById("btnAceptar");
btnAceptar.addEventListener("click", e => {
    destroyResultados();
    redirectToCategories();
})

const btnRechazar = document.getElementById("btnRechazar");
btnRechazar.addEventListener("click", e => {
    document.getElementById("modalOperaciones").style.display = "none";
})

