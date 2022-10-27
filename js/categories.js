import { redirectToConsejos, redirectToIndex } from "./routes.js";
import { destroySession } from "./authorize.js";


const btnSumas = document.getElementById("btnSumas");
btnSumas.addEventListener('click', e => {
    localStorage.setItem("categoria", "1");
    redirectToConsejos();
});

const btnRestas = document.getElementById("btnRestas");
btnRestas.addEventListener('click', e => {
    localStorage.setItem("categoria", "2");
    redirectToConsejos();
});

const btnDivision = document.getElementById("btnDivision");
btnDivision.addEventListener('click', e => {
    localStorage.setItem("categoria", "3");
    redirectToConsejos();
});

const btnMultiplicacion = document.getElementById("btnMultiplicacion");
btnMultiplicacion.addEventListener('click', e => {
    localStorage.setItem("categoria", "4");
    redirectToConsejos();
});

const btnTodo = document.getElementById("btnTodo");
btnTodo.addEventListener('click', e => {
    localStorage.setItem("categoria", "5");
    redirectToConsejos();
});

const btnCerrar = document.getElementById("btnCerrar");
btnCerrar.addEventListener('click', e => {
    document.getElementById("modalCategories").style.display = "initial";
});

const btnAceptar = document.getElementById("btnAceptar");
btnAceptar.addEventListener("click", e => {
    destroySession();
    redirectToIndex();
})

const btnRechazar = document.getElementById("btnRechazar");
btnRechazar.addEventListener("click", e => {
    document.getElementById("modalCategories").style.display = "none";
})
