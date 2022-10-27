import { redirectToInforme } from "./routes.js";

//*******************************************************************************************//
//FUNCIONES PARA LAS OPERACIONES MATEMATICAS
//Cambia la categoria del juego en la pagina de consejos
export const cambiarCategoria = () => {
   
    const cookie = localStorage.getItem("categoria");
    let categoria = "";

    switch (cookie) {
        case "1":
            categoria="SUMAS";
        break;

        case "2":
            categoria="RESTAS"
        break;

        case "3":
            categoria="DIVISIÓN"
        break;

        case "4":
            categoria="MULTIPLICACIÓN"
        break;

        case "5":
            categoria="MIXTA"
        break;
    }
    document.getElementById("spanSuma").innerHTML = categoria;
    return categoria;
}

//Funcion para cambiar el signo de la operacion matematica
export const cambiarSignoOperacion = () => {
    const cookie = localStorage.getItem("categoria");
    let categoria = "";

    switch (cookie) {
        case "1":
            categoria="+";
        break;

        case "2":
            categoria="-"
        break;

        case "3":
            categoria="÷"
        break;

        case "4":
            categoria="x"
        break;

        case "5":
            let valor = numeroRandom(1,4);
            switch (valor){
                case 1:
                    categoria = "+"
                    break;
                case 2:
                    categoria = "-"
                    break;
                case 3:
                    categoria="÷"
                    break;
                case 4:
                    categoria="x"
                    break;
            }
        break;
    }
    document.getElementById("signoOperacion").innerHTML = categoria;
    return categoria;
}

//Funcion para cambiar los numeros de la operacion matematica
export const cambiarNumerosOperacion = (signo) => {
    let numA = 0;
    let numB = 0;
   //de kinder 5 años 1 a 10 solo sumas
   //de primer a segundo 1 a 20 sumas y restas
   //de tercer grado 1 a 20 multiplicaciones y divisiones
   //de cuarto y quinto 1 a 30
   //de basica 1 a 50
   //de media 1 a 100
    let minSumas = 1;
    let maxSumas = 50
    let minRestas = 1;
    let maxRestas = 50
    let minMultiplicacion = 1;
    let maxMultiplicacion = 9
    let minDivision = 1;
    let maxDivision = 50

    if(signo === '+'){
        numA = numeroRandom(minSumas, maxSumas);
        numB = numeroRandom(minSumas, maxSumas);
    }

    if(signo === '-'){
        numA = numeroRandom(minRestas, maxRestas);
        numB = numeroRandom(minRestas, maxRestas);

        while (numB > numA){
            numB = numeroRandom(minRestas, maxRestas);
        }
    }

    if(signo === '÷'){
        numA = numeroRandom(minDivision, maxDivision);
        numB = numeroRandom(minDivision, maxDivision);

        while (numA % numB != 0 || numA === numB || numB === 1){
            numA = numeroRandom(minDivision, maxDivision);
            numB = numeroRandom(minDivision, maxDivision);
        }
    }

    if(signo === 'x'){
        numA = numeroRandom(minMultiplicacion, maxMultiplicacion);
        numB = numeroRandom(minMultiplicacion, maxMultiplicacion);
    }

    document.getElementById("numArriba").innerHTML = numA; 
    document.getElementById("numAbajo").innerHTML = numB; 
}

//Funcion para validar la respuesta ingresada por el usuario
export const comprobarRespuesta = (veces) => {
    let res = false;

    const numA = parseInt(document.getElementById("numArriba").innerHTML);
    const numB = parseInt(document.getElementById("numAbajo").innerHTML);
    const resUsuario = parseInt(document.getElementById("txtResultado").value);
    const tipoOperacion = document.getElementById("signoOperacion").innerHTML;
    
    let aciertos = 0;
    let errores = 0;
    let resCorrecta = 0;

    switch(tipoOperacion){
        case '+':
            if(resUsuario == numA + numB){
                resCorrecta = resUsuario
                aciertos ++;
            }else{
                resCorrecta = numA + numB;
                errores ++;
            }
        break;

        case '-':
            if(resUsuario == numA - numB){
                resCorrecta = resUsuario
                aciertos ++;
            }else{
                resCorrecta = numA - numB;
                errores ++;
            }
        break;

        case '÷':
            if(resUsuario == numA / numB){
                resCorrecta = resUsuario
                aciertos ++;
            }else{
                resCorrecta = numA / numB;
                errores ++;
            }
        break;

        case 'x':
            if(resUsuario == numA * numB){
                resCorrecta = resUsuario
                aciertos ++;
            }else{
                resCorrecta = numA * numB;
                errores ++;
            }
        break;
    }

    guardarHistorialRespuestas(numA, numB, tipoOperacion, resUsuario, resCorrecta);
    if(guardarRespuestas(aciertos, errores, veces)){
        res = true;
    }else{
        let signo = cambiarSignoOperacion();
        cambiarNumerosOperacion(signo);
        limpiarEntradaUsuario();
    }

    return res;
}

export const iniciarTiempo = (minute, second, veces) =>{
    const min = minute;
    const seg = second;

    const spanMin = document.getElementById("timerMinute");
    const spanSeparador = document.getElementById("separator");
    const spanSeg = document.getElementById("timerSecond");

    //se resetea el color a verde
    spanMin.style.color="rgb(12 143 25)";
    spanSeparador.style.color="rgb(12 143 25)";
    spanSeg.style.color="rgb(12 143 25)";

    const myTimer = setInterval(() => {
        if(second > -1){
            second --;

            if(second < 10){
                spanMin.style.color="red";
                spanSeparador.style.color="red";
                spanSeg.style.color="red";
                second = "0" + second
            }
            
            if(second === "0-1" && minute >= 1){
                minute--;
                second = 59;
            }

            if( minute === 0 && second === "0-1"){
                second = "00"
                if(comprobarRespuesta(veces)){
                    clearInterval(myTimer);
                    redirectToInforme();
                }else{
                    spanMin.style.color="rgb(12 143 25)";
                    spanSeparador.style.color="rgb(12 143 25)";
                    spanSeg.style.color="rgb(12 143 25)";

                    minute = min;
                    second = seg
                }
            }
        }
        spanMin.innerHTML = minute;
        spanSeg.innerHTML= second;

    }, 1000);

    return myTimer;
}

//funcion para limpiar la entrada del usuario
function limpiarEntradaUsuario(){
    document.getElementById("txtResultado").value="";
}

//function para guardar en local las respuestas del usuario
function guardarRespuestas(aciertos, errores, veces ){
    let res = false;
    const obtenerResultados = localStorage.getItem("resultados");
   
    if(obtenerResultados !== null){

        let values = obtenerResultados.split('|');
        aciertos = parseInt(values[0]) + aciertos;
        errores = parseInt(values[1]) + errores;
        localStorage.setItem("resultados", `${aciertos}|${errores}`);
        
        //Aqui se lleva la cuenta de los ejercicios respondidos
        conteoEjercicios(aciertos + errores, veces)
        //Aqui se verifica la cantidad de operaciones a realizar
        if(aciertos + errores === veces){
            res = true;
        }

    }else{
        conteoEjercicios(aciertos + errores, veces)
        localStorage.setItem("resultados", `${aciertos}|${errores}`);

    }
    return res;
}

//Funcion para guardar el registro de las operaciones realizadas por el usuario
function guardarHistorialRespuestas(numA, numB, tipoOperacion, respuestaUser, respuestaCorrecta){

    if(!respuestaUser && respuestaUser !== 0 ){
        respuestaUser = "sin respuesta"
    }

    let obtenerHistorialResultados = localStorage.getItem("historialResultados");
   
    if(obtenerHistorialResultados !== null){

        obtenerHistorialResultados += `|${numA} ${tipoOperacion} ${numB}&${respuestaUser}&${respuestaCorrecta}`;
       
        localStorage.setItem("historialResultados", obtenerHistorialResultados);

    }else{
        localStorage.setItem("historialResultados", `${numA} ${tipoOperacion} ${numB}&${respuestaUser}&${respuestaCorrecta}`);
    }
}

export const conteoEjercicios = (resueltos, total) => {
    document.getElementById("opFinalizadas").innerHTML = resueltos + 1;
    document.getElementById("opTotales").innerHTML = total;
}

//*******************************************************************************************//
//FUNCIONES PARA INFORME DE RESULTADOS
//rango de notas
//0-3 muy malo
//4,5 malo
//6,7 bueno
//8,9 muy bueno
//10 excelente

export const calcularNota = () => {  
    const resultados = localStorage.getItem("resultados");
    let user = localStorage.getItem("tokenAprendo");
   
    const [aciertos, errores] = resultados.split('|');
    const {name, chico, chica} = JSON.parse(user);
    
    const totalEjerciciosResueltos = parseInt(aciertos) + parseInt(errores);

    //calculo de la nota: 
    //1 a 10
    let nota = (10/totalEjerciciosResueltos) * aciertos;
    nota = roundToTwo(nota);

    cambiarMensajes(nota);
    cambiarAvatar(chico, chica, nota);
    reproducirSonido(nota);
    //para completar tarjeta de resultados
    document.getElementById("nota").innerHTML = nota;
    document.getElementById("aciertos").innerHTML = aciertos;
    document.getElementById("errores").innerHTML = errores;
    document.getElementById("user").innerHTML = name;
}

//para cambiar los mensajes segun la nota
function cambiarMensajes(nota){

    const title = document.getElementById("title")
    const msgResultado = document.getElementById("mensajeResultado");

    if(nota >= 0 && nota < 4){
        title.innerHTML = "¡MUY MALO!";
        msgResultado.innerHTML = "¡Esto es terrible! &#128565; Quisieramos creer que has estado jugando a las adivinanzas con estas operaciones. De lo contrario te sugerimos que le pidas ayuda a tus padres o maestros para reforzar el tema. Y no sientas pena en pedir ayuda. Recuerda: 'pedir ayuda es el empujón que se necesita para hacer mejor las cosas'.";
    }else if(nota >= 4 && nota < 6){
        title.innerHTML = "¡MALO!";
        msgResultado.innerHTML = "¡¿Que te ha sucedido?! Hemos revisado tus respuestas varias veces pero lamentamos decirte que tu nota ha sido bastante baja. Pero no te desanimes, sigue practicando y seguro conseguiras mejorar mucho.";
    }else if(nota >= 6 && nota < 8 ){
        title.innerHTML = "¡BUENO!";
        msgResultado.innerHTML = "Aunque esta nota puede parecer aceptable para algunos, creemos que puedes obtener un mejor resultado. Si prácticas mucho seguro conseguirás mejorar bastante. Asi que recuerda: 'La conformidad es el enemigo del crecimiento'.";
    }else if(nota >= 8 && nota < 9.6){
        title.innerHTML = "¡MUY BUENO!";
        msgResultado.innerHTML = "Queremos felicitarte, tu práctica y perseverancia han empezado a dar resultados. El puntaje que haz alcanzado es admirable. ¡Sigue adelante!";
    }else if(nota >= 9.6 && nota < 10) {
        title.innerHTML = "¡MUY BUENO!";
        msgResultado.innerHTML = "¡Que suspenso! &#128562; ¡Por poquito y logras alcanzar una nota excelente! Queremos felicitarte, tu práctica y perseverancia han empezado a dar resultados. El puntaje que haz alcanzado es admirable. ¡Sigue adelante!";
    }else if (nota == 10){
        title.innerHTML = "¡FELICIDADES!";
        msgResultado.innerHTML = "¡Nos has dejado sorprendidos! &#128561; Como dicen, la práctica hace al maestro y ahora tú lo haz demostrado. Puedes sentirte orgulloso/a, haz alcanzado un puntaje perfecto. ¡Sigue así!";
    }
}


function cambiarAvatar(chico, chica, nota){
    const avatar = document.getElementById("img-avatar");
    const rostro = document.getElementById("img-rostro");
    const numeroAleatorio = numeroRandom(1, 4);
    if(chico){

        switch(numeroAleatorio){
            case 1:
                avatar.src="../public/img/chico1.png";
                break;
            case 2:
                avatar.src="../public/img/chico2.png";
                break;
            case 3:
                avatar.src="../public/img/chico3.png";
                break;
            case 4:
                avatar.src="../public/img/chico4.png";
                break;
        }

    }

    if(chica){
        switch(numeroAleatorio){
            case 1:
                avatar.src="../public/img/chica3.png";
                break;
            case 2:
                avatar.src="../public/img/chica3.png";
                break;
            case 3:
                avatar.src="../public/img/chica3.png";
                break;
            case 4:
                avatar.src="../public/img/chica3.png";
                break;
        }
    }
    
    if(nota >= 0 && nota < 4){
        rostro.src="../public/img/muy-mal.png";
    }else if(nota >= 4 && nota < 6){
        rostro.src="../public/img/malo.png";
    }else if(nota >= 6 && nota < 8 ){
        rostro.src="../public/img/bueno.png";
    }else if(nota >= 8 && nota < 10){
        rostro.src="../public/img/muy-bueno.png";
    }else if (nota == 10){
        rostro.src="../public/img/excelente.png";
    }
}


function reproducirSonido(nota){
    const audio = document.getElementById("audioInforme");
    
    if(nota >= 0 && nota < 6){
        audio.src="../public/audio/sonido-loser.mp3";
        audio.autoplay = "autoplay";
    }else if(nota >= 6 && nota <=10){
        audio.src="../public/audio/sonido-winner.mp3";
        audio.autoplay = "autoplay";
    }
}

//*******************************************************************************************//
//FUNCIONES EXTRAS
//Funcion para obtener de forma un numero aleatorio
//entre un numero minimo y maximo
function numeroRandom (min, max){
    // min = Math.ceil(min);
    // max = Math.floor(max);
    return Math.floor(Math.random() * (1 + max - min) + min);
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}