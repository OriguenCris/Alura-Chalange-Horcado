const palabras = ["dormir", "cantante", "reloj","trabajo","relleno","anime","patagonia","viaje","avion","barco","motoneta","espacio","jedi","galaxia","guerra"]

const btnTeclado = document.querySelectorAll("#teclado .tecla");
const btnInicioJuego =document.getElementById("btnInioJuego");
const btnNuevoJuego = document.getElementById("btnNuevoJuego");
const btnGuardarPalabra = document.getElementById("guardarPalabraIn");
const inputPalabraIngresada = document.getElementById("textIngresado");
const modalContainer = document.getElementById('modal_container');
const close = document.getElementById('close');
const parrafo = document.getElementById("palabraSecreta");
const imagen = id("imagen");
const lottie = id("lottieVideo")

let palabraIgresada = localStorage.getItem("palabra");
let palabraSecreta = "";
let vidas = 8;
let acertadas = 0;
   
function id(str){
    return document.getElementById(str);    
}
const guardarPalabraLocal =  () =>{
    const textoIng = inputPalabraIngresada.value
    localStorage.setItem("palabra",textoIng)
    console.log(typeof palabraIgresada)
}
//iniciar Juego conel boton juegonuevo
function iniciarJuego(){
    imagen.src = `../Multimedia/img0.png`
    btnNuevoJuego.disabled=true;
    console.log(typeof palabraIgresada)
    tecladoP()
    if(palabraIgresada !== null)
    {    palabraSecreta = palabraIgresada;
        crearLineas()
        console.log("paso False")
        
    }else{
        palabraRandom()
         crearLineas()
        console.log("paso true")   
    }
    vidas = 1;
    acertadas = 0;
    
    console.log(palabraSecreta);
    const btnTeclado = document.querySelectorAll("#teclado .tecla");
    for (let i = 0; i < btnTeclado.length; i++){
        btnTeclado[i].disabled = false;
     }
     localStorage.clear()
     palabraIgresada =localStorage.getItem("palabra")
}


// Genera la palabra random
const palabraRandom = () => palabraSecreta =  palabras[Math.floor(Math.random() * palabras.length)];
//Genera las lineas segun la cantidad de letras. ingresando un span en el html.
const crearLineas = () =>{
    parrafo.innerHTML = "";
    for( let i = 0; i < palabraSecreta.length; i++){
        parrafo.appendChild(document.createElement("span"));
     }
}

//funcion Para el teclado y comparacion de las teclas presionadas con las palabras.
const tecladoP =() =>{
 for (let i = 0; i < btnTeclado.length; i++){
    btnTeclado[i].addEventListener( "click", clickTeclado);
    }
 }
//compara el caracter en el boton presionado, con la palabra secreta. la convierte en mayuscula y si la acerta la pone en el lugar correto.
function clickTeclado(event){
    let palabraSelec = document.querySelectorAll("#palabraSecreta span");
    const button = event.target;
    button.disabled = true;
    const letraPresionada = button.innerHTML.toUpperCase();
    const palabraSecrMayus = palabraSecreta.toUpperCase();
    let  acerto = false;
    
    for(let i = 0; i < palabraSecrMayus.length; i++){
        if ( letraPresionada == palabraSecrMayus[i]){
            palabraSelec[i].innerHTML =letraPresionada;
            acertadas++;
            acerto = true;
        }
    }
    if (acerto == false){
        const Srce = `../Multimedia/img${vidas}.png`;        
        imagen.src = Srce;
        vidas++;
    }
    if (vidas == 8){
        finJuego()
        mostrar();
    }
     else if (acertadas == palabraSecreta.length){
        mostrar()
        finJuego() 
    }
}
//funcion que cierra el teclado y restable elboton de juego nuevo.
const finJuego = () => {
    const btnTeclado = document.querySelectorAll("#teclado .tecla");
    for (let i = 0; i < btnTeclado.length; i++){
        btnTeclado[i].disabled = true;
     } 
     btnNuevoJuego.disabled= false;
};
//muestra la ventana modal que anuncia si gano o Perdio
function mostrar(){
    if(vidas = 8){  
        modalContainer.classList.add('show');        
        id("mensaje").innerHTML = "Perdiste, la palabra secreta era " + palabraSecreta;
        lottie.src = "../Multimedia/99490-skull.mp4";
        close.addEventListener('click', () => modalContainer.classList.remove('show'));
    } if (acertadas == palabraSecreta.length){
        modalContainer.classList.add('show');
        id("mensaje").innerHTML =  "Felicidades Ganaste";
        lottie.src ="../Multimedia/50743-best.mp4";
        close.addEventListener('click', () => modalContainer.classList.remove('show'));
    }
}
