let btnStart = document.getElementById('btn_start');
let divInicio = document.getElementById('inicio');
let divGame = document.createElement("div");
let divLoser = document.createElement("div");
let divWin = document.createElement("div");
let respuesta = document.createElement("input");
let dificultad = document.getElementById('dificultad');
let responder = document.createElement("button");
let btnBack = document.createElement("button");
let p = document.createElement("p1");

responder.addEventListener("click", Comprobar);
btnStart.addEventListener("click", Iniciar);
btnBack.addEventListener("click", Back);

let max  = 100;
let min = 1;
let intentos = 0;
let number = 0;

let numero = Math.floor(Math.random()*(max-min) + min);
console.log(numero);

function Iniciar(){
    if(dificultad.value == 3){
        createDiv("Difícil");
    }else if(dificultad.value == 2){
        intentos = 3;
        createDiv("Medio");
    }else if(dificultad.value == 1){
        intentos = 5;
        createDiv("Fácil")
    }else{
        alert("Selecciona una dificultad.");
    }
}

function createDiv(mensaje){
    divInicio.style.display = "none";
    let h1 = document.createElement("h1");
    
    h1.innerHTML = "Dificultad: " + mensaje;
    p.innerHTML = "Adivina el numero: ";
    respuesta.type = "text";
    responder.innerHTML = "Responder";

    divGame.appendChild(h1);
    divGame.appendChild(p);
    divGame.appendChild(respuesta);
    divGame.appendChild(responder);
    document.body.appendChild(divGame);
}

function Comprobar(){
    let valor = respuesta.value;
    
    if(valor != "" && isNumeric(valor) == true && valor < 101){
        if(dificultad.value == 3){
            ModoHard(valor);
        }else if(dificultad.value == 2){
            if(intentos >= 0)
                intentos = intentos - 1;
                ModoMedium(intentos,valor);
            
        }else if(dificultad.value == 1){
            if(intentos >= 0)
                intentos = intentos - 1;
                ModoEasy(intentos,valor);
        }
    }else
    {
        alert("Ingrese un valor valido");
    }
}

function isNumeric(valor){
    let valoresAceptados = /^[0-9]+$/;

        if (valor.match(valoresAceptados)){
           return true;
        } else {
          return false;
       }
}

function Win(){
    divGame.style.display = "none";
    let p = document.createElement("p1");

    p.innerHTML = "Felicitaciones haz acertado";
    p.style.fontSize = "1.3em";
    p.style.color = "green";
    p.style.fontWeight = "bold";
    btnBack.innerHTML = "Regresar";

    divWin.appendChild(p);
    divWin.appendChild(btnBack);
    document.body.appendChild(divWin);
    
    btnBack.addEventListener("click", Back);
}

function Lost(){
    divGame.style.display = "none";
    let p = document.createElement("p1");

    p.innerHTML = "Haz perdido, pero puedes intentarlo de nuevo!!";
    p.style.color = "red";
    p.style.fontSize = "1.3em";
    p.style.fontWeight = "bold";
    
    divLoser.appendChild(p);
    divLoser.appendChild(btnBack);
    btnBack.innerHTML = "Regresar"
    document.body.appendChild(divLoser);    
}

function ModoHard(dato){
    console.log(dato);
    if(dato == numero){
        Win();
    }
    else{
        Lost();
    }
}

function ModoMedium(intentos, dato){
    if(intentos > 0){
        if(dato == numero){
            Win();
        }else if(dato == 0){
            Lost();
        }else if(dato > numero){
            console.log(dato + " - " + numero);
            p.innerHTML="El número ingresado es MAYOR al buscado\nTienes "+intentos+" intentos para adivinar el número: ";
        }else if(dato < numero){
            console.log(dato + " - " + numero);
            p.innerHTML="El número ingresado es MENOR al buscado\nTienes "+intentos+" intentos para adivinar el número: ";
        }
    }else{
        Lost();
    }
}

function ModoEasy(intentos, dato){
    if(intentos > 0){
        if(dato == numero){
            Win();
        }else if(dato == 0){
            Lost();
        }else if(dato > numero){
            p.innerHTML="El número ingresado es MAYOR al buscado\nTienes "+intentos+" intentos para adivinar el número: ";
        }else if(dato < numero){
            p.innerHTML="El número ingresado es MENOR al buscado\nTienes "+intentos+" intentos para adivinar el número: ";
        }
    }else{
        Lost();
    }   
}

function Back(){
    location.reload();
}