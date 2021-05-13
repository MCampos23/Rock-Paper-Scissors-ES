let player
let pc = "scissors"


let playerColumn = document.querySelector('#player-column')
let pcColumn = document.querySelector('#pc-column')
let playerScore = document.querySelector('#player-score')
let pcScore = document.querySelector('#pc-score')
let resultMessage = document.querySelector('#result-message')
let playerPoints = 0
let pcPoints = 0

//Jugador hace click en su jugada el marco de la columna de pc se mueve durante dos segundos y acaba en la img que el pc ha seleccionado

playerColumn.onclick = (e) => {
    player = e.target.alt
    //pcPlay()
    clearBorder()
    pcPlayEffect()
    //compareResult()
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

function showResultMessage(message) {
    resultMessage.innerHTML = message
    setTimeout(() => { resultMessage.innerHTML = ""; }, 1000)
}


let interval
function pcPlayEffect() {
    let counter = 0;
    startEffect();
    interval = setInterval(() => {
        counter++;
        if (counter >= 3) {
            stopEffect();
            if (pc === "rock") {
                stayOn(0);
            } else if (pc === "papper") {
                stayOn(1);
            } else if (pc === "scissors") {
                stayOn(2);
            }
        }
        startEffect();
    }, 600);
}

function startEffect() {
    addRemoveBorder(0)
    setTimeout(() => {
        addRemoveBorder(1)
    }, 200);
    setTimeout(() => {
        addRemoveBorder(2)
    }, 400);
}

function addRemoveBorder(img) {
    pcColumn.children[img].children[0].classList.toggle("pcPlay")
    setTimeout(function () { pcColumn.children[img].children[0].classList.toggle("pcPlay") }, 200);
}

function stayOn(img) {
    setTimeout(function () { pcColumn.children[img].children[0].classList.add("pcPlay") }, 600);
}

function clearBorder() {
    pcColumn.children[0].children[0].classList.remove("pcPlay")
    pcColumn.children[1].children[0].classList.remove("pcPlay")
    pcColumn.children[2].children[0].classList.remove("pcPlay")
}

function stopEffect() {
    clearInterval(interval)
}














