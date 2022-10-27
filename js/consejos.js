import { redirectToOperaciones, redirectToError} from "./routes.js"
import { cambiarCategoria } from "./aprendo.js"; 

const btnComenzar = document.getElementById("btnComenzar");
btnComenzar.addEventListener('click', e => {
    redirectToOperaciones();
});

window.onload = function () {
    const val = cambiarCategoria();
    if(val === "" || val === null){
        redirectToError();
    }
}