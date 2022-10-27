import { destroyNotas, destroyResultados, informeIsValid } from './authorize.js';
import { calcularNota } from './aprendo.js';
import { redirectToCategories, redirectToOperaciones } from './routes.js';

window.onload = function (){
    calcularNota();
}

const btnIrCategorias = document.getElementById("btnIrCategorias");
btnIrCategorias.addEventListener('click', (e) => {
    destroyResultados();
    informeIsValid();
    redirectToCategories();
});

const btnVolverJugar = document.getElementById("btnVolverJugar");
btnVolverJugar.addEventListener("click", e => {
    destroyNotas();
    informeIsValid();
    redirectToOperaciones();
});

const btnVerResultados = document.getElementById("btnVerResultados");
btnVerResultados.addEventListener("click", e => {
    toogleModal();
});


function toogleModal(){
    let display = document.getElementById("modalResultados");
    if(display.style.display === "initial" ){
        display.style.display = "none";
    }else{
        display.style.display = "initial";
        llenarModalResultados();
    }
}

const btnCerrarModal = document.getElementById("btnCerrarModal");
btnCerrarModal.addEventListener("click", e => {
    toogleModal();
});

function llenarModalResultados(){
    const result = localStorage.getItem("historialResultados");
    if(result !== null){
        const operaciones = result.split('|');
        const div = document.getElementById("modal-body");
        div.innerHTML="";
        //35 + 36&3&71
        operaciones.forEach((value, index, array) => {

            //por cada iteracion se debe crear una tarjeta
            let detalles = value.split('&');
            let colorSpan = "res-error";
            let img = "error";
            if(detalles[1] == detalles[2]){
                colorSpan = "res-correct";
                img = "correct";
            }
            div.innerHTML += ` 
            <div class="card-modal">
                <div><span id="indice" class="card-number-modal">${index + 1}</span></div>
                <div class="card-body-modal">
                    <div><span id="operacion">${detalles[0]}</span></div>
                    <div><span>Tu respuesta: </span><span id="rUser" class=${colorSpan}> ${detalles[1]} </span></div>
                    <div><span>Respuesta correcta: </span><span id="rSystem" class="res-correct"> ${detalles[2]} </span></div>
                </div>
                <div class="card-footer-modal">
                    <img id="iconRes" src="../public/icon/${img}.svg">
                </div>
            </div>
            `
        })
    }
}
