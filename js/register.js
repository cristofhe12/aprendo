import { redirectToIndex, redirectToCategories } from "./routes.js";
import { logonUser } from "./authorize.js";

const btnVolver = document.getElementById("btnVolver");
btnVolver.addEventListener('click', e => {
    redirectToIndex();
});

const btnIniciar = document.getElementById("btnIniciar");
btnIniciar.addEventListener('click', e => {
  
    if (logonUser()){
        //el usuario es correcto
        console.log("USUARIO VALIDO")
        redirectToCategories();

    }else{
        //el usuario es incorrecto
        const modal = document.getElementById("modalRegister")
        modal.style.display = "initial"
        console.log(modal.style)
        console.log("USUARIO INVALIDO")
    }
});

const btnCloseModal = document.getElementById("modalRegister");
btnCloseModal.addEventListener("click", e => {
    const modal = document.getElementById("modalRegister")
    modal.style.display = "none"
})