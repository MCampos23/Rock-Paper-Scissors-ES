let player = ""
let pc = ""
let playerScore = 0
let pcScore = 0

container = document.querySelector('.container')
rock = document.querySelector("#rock")
papper = document.querySelector("#papper")
scissors = document.querySelector("#scissors")

container.onclick = (e)=>{
    console.log(e.target.id)
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












