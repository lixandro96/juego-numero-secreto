
let numeroSecreto ;
let intentos ;
let numeroMaximo = 20;
let botonIntentar = document.querySelector('#intentar');
let botonReiniciar = document.querySelector('#reiniciar');
let listaNumerosSorteados = [];

inicioJuego()
numeroSecreto = generarNumeroSecreto();
function inicioJuego(){
  asignaTextoElemento('.container__texto h1','Juego del número secreto');
  asignaTextoElemento('.texto__parrafo',`Indíca un número del 1 al ${numeroMaximo}`);
  intentos = 1
  
}

// funcion que asigna los textos de las etiquetas
function asignaTextoElemento(elemento,texto,clase = null) {
  let elementoHtml = document.querySelector(elemento);
  elementoHtml.textContent = texto;
  elementoHtml.classList.add(clase);
  return
}

// funcion que genera un numero aleatorio
function generarNumeroSecreto() {
  let numeroGenerado = Math.floor( Math.random() * numeroMaximo) + 1;

  if(listaNumerosSorteados.length == numeroMaximo){
    asignaTextoElemento('.texto__parrafo',`Haz finalizado el juego!`,'success');
    botonIntentar.classList.add('noClick')
  }else{
    if(listaNumerosSorteados.includes(numeroGenerado)){
      return generarNumeroSecreto();
    }else{
      listaNumerosSorteados.push(numeroGenerado);
      return numeroGenerado;
      
    }
  }
}

// funcion que valida el numero introducido por el usuario
function verificarIntento() {
  let numeroUsuario = parseInt(document.querySelector('#valorUsuario').value);
  
  if(!numeroUsuario){
    asignaTextoElemento('.texto__parrafo','Debes ingresar un número','danger');
    setTimeout(() => {
      let parrafo = document.querySelector('.texto__parrafo');
      parrafo.classList.remove('danger')
      asignaTextoElemento('.texto__parrafo',`Indíca un número del 1 al ${numeroMaximo}`);
    }, 2500);
  }else{
    
    if(numeroUsuario === numeroSecreto){
      asignaTextoElemento('.texto__parrafo',`Felicidades, acertaste en ${intentos} ${ intentos === 1 ? 'vez' : 'veces' }`);
      botonReiniciar.removeAttribute('disabled');
      
    }else{
      if(numeroUsuario < numeroSecreto){
        asignaTextoElemento('.texto__parrafo',`El numero secreto es mayor que ${numeroUsuario}`);
      }else{
        asignaTextoElemento('.texto__parrafo',`El numero secreto es menor que ${numeroUsuario}`);
      }
      intentos++
    }
  }
  limparCaja()
  
  return;
}

// funcion que limpia la caja de numero
function limparCaja() {
  let valorCaja = document.querySelector('#valorUsuario');
  valorCaja.value = '';
}
// funcion que reinicia el juego
function reiniciarJuego(){
  inicioJuego()
  limparCaja()
  botonReiniciar.setAttribute('disabled',true)
  numeroSecreto = generarNumeroSecreto();
}
botonReiniciar.addEventListener('click',reiniciarJuego)
inicioJuego()
