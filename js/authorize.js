
export const logonUser = () =>{
    const username = document.getElementById("txtNombre").value
    const genderChico = document.getElementById("rbChico").checked;
    const genderChica = document.getElementById("rbChica").checked;
    
    let isValid = true;
    
    if(username === null || username === ""){
       isValid = false;
    }

    if(!genderChico && !genderChica){
        isValid = false;
    }

    if(isValid){
        localStorage.setItem("tokenAprendo", `{"name":"${username}","chico":${genderChico},"chica":${genderChica}}`);
    }
    return isValid
}

export const existSessionOpen = () => {
    let existSession = false;
    const cookie = localStorage.getItem("tokenAprendo");
    console.log(cookie);

    if(cookie !== null && cookie !== ""){
        //const json = JSON.parse(cookie)
        existSession = true
    }
    
    return existSession;
}

export const existCategoria = () => {
    let existCategoria = false;
    const cookie = localStorage.getItem("categoria");

    if(cookie !== null && cookie !== ""){
        existCategoria = true
    }
    
    return existCategoria;
}

export const existResultados = () => {
    let exisResultados = false;
    const cookie = localStorage.getItem("resultados");

    if(cookie !== null && cookie !== ""){
        exisResultados = true
    }
    
    return exisResultados;
}

export const informeIsValid = () =>{
    const informe = localStorage.getItem("informe");
    let isValid = false;

    if (informe == null || informe == ""){
        localStorage.setItem("informe", "1")
        isValid = true;
    }else{
        if(informe === "1"){
            localStorage.removeItem("informe");
        }
    }
    return isValid
}

export const destroySession = () => {
    localStorage.removeItem("tokenAprendo");
    localStorage.removeItem("categoria");
    localStorage.removeItem("resultados");
    localStorage.removeItem("historialResultados");
}


export const destroyResultados = () => {
    localStorage.removeItem("resultados");
    localStorage.removeItem("historialResultados");
    localStorage.removeItem("categoria");
}

export const destroyNotas = () => {
    localStorage.removeItem("resultados");
    localStorage.removeItem("historialResultados");
}
