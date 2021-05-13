let player
let pc


let playerColumn = document.querySelector('#player-column')
let pcColumn = document.querySelector('#pc-column')
let playerScore = document.querySelector('#player-score')
let pcScore = document.querySelector('#pc-score')
let resultMessage = document.querySelector('#result-message')
let playerPoints = 0
let pcPoints = 0

playerColumn.onclick = (e) => {
    $( "#resul.message" ).show( "slow" )
    // player = e.target.alt
    // pcPlay()
    // compareResult()
    // console.log('Player: ' + player)
    // console.log('Pc: ' + pc)

}

function pcPlay() {
    num = Math.ceil(Math.random() * 3)
    if (num == 1)
        pc = "rock"
    else if (num == 2)
        pc = "papper"
    else
        pc = "scissors"

    return pc
}

function compareResult() {
    if (pc == player)
        showResultMessage("Tie")
    else if ((player == "rock" && pc == "papper") || (player == "papper" && pc == "scissors") || (player == "scissors" && pc == "rock")) {
        pcPoints++
        pcScore.innerHTML = pcPoints
        showResultMessage("You lose...")
    }
    else {
        playerPoints++
        playerScore.innerHTML = playerPoints
        showResultMessage("You win!")
    }
}

function showResultMessage(message){
        resultMessage.innerHTML = message
        setTimeout(()=>{ resultMessage.innerHTML=""; }, 1000)
} 

$( "button" ).click(function() {
    $( "#resul.message" ).show( "slow" );
  });

let nIntervId

function cambiaDeColor() {
    nIntervId = setInterval(flasheaTexto, 300);
}

function flasheaTexto() {
    let pcPapper = pcColumn.children[1].children[0]
    pcPapper.classList.toggle("pcPlay")

}

function detenerCambioDeColor() {
    clearInterval(nIntervId);
}


// Comprobacion de los clicks de cada img
// /*
// piedra.onclick= function(){alert("has elegido piedra")}
// papel.onclick= function (){alert("has elegido papel")}
// tijera.onclick= function(){alert("has elegido tijera")}
// */

// Asignación del evento onclick de cada imagen

// piedra.onclick = function () {
//      jugador = "piedra"
//      jugadaPc()
//      console.log("Has elegido " + jugador + " y la máquina " + pc)
//      compararResultado()
// }
// papel.onclick = function () {
//     jugador = "papel"
//     jugadaPc()
//     console.log("Has elegido " + jugador + " y la máquina " + pc)
//     compararResultado()
// }
// tijera.onclick = function () {
//     jugador = "tijera"
//     jugadaPc()
//     console.log("Has elegido " + jugador + " y la máquina " + pc)
//     compararResultado()
// }



// Función para crear la jugada aleatoria del pc
// function jugadaPc() {
//     num = Math.random()
//     num = Math.ceil(num * 3)
//     if (num == 1)
//         pc = "piedra"
//     else if (num == 2)
//         pc = "papel"
//     else
//         pc = "tijera"

//     return pc
// }

// Función para comparar el resultado del jugador con el pc y sumar puntuación al ganador 
// function compararResultado() {
//     if (pc == jugador)
//         alert("Empate")
//     else if ((jugador == "piedra" && pc == "papel") || (jugador == "papel" && pc == "tijera") || (jugador == "tijera" && pc == "piedra")){
//         alert("Pierdes")
//         marcadorPc++
//     }
//     else{
//         alert("Ganas")
//         marcadorJugador++
//     }  

//     console.log("Puntuación jugador: " + marcadorJugador)
//     console.log("Puntuación pc: " + marcadorPc)

//     if (marcadorJugador >= 3 || marcadorPc >= 3){
//         alert("Se te han acabado las jugadas")
//         marcadorPc=0
//         marcadorJugador=0
//     }
// }












