import { redirectToCategories } from './routes.js';

const btnError = document.getElementById("btnError");
btnError.addEventListener('click', e => {
    redirectToCategories();
})