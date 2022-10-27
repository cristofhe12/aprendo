import { redirectToCategories, redirectToRegister} from "./routes.js";
import { existSessionOpen } from "./authorize.js";

const btnEmpezar = document.getElementById("btnEmpezar");
btnEmpezar.addEventListener('click', e => {
    if(existSessionOpen()){
        redirectToCategories()
    }else{
        redirectToRegister();
    }
});
