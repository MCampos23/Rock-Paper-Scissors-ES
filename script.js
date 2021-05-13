let playerColumn = document.querySelector('#player-column')
let pcImg=Array.from(document.querySelectorAll('.pc-img'))
let playerPoints = 0
let pcPoints = 0
let player
let pc 
let finished = true

playerColumn.onclick = (e) => {
    
    if(finished===true){
        finished = false
        clearBorder()
        pcPlay()
        e.target.classList.add('pcPlay')
        pcPlayEffect()
        player = e.target.alt
        setTimeout(() => {
            finished = true
            compareResult()
        }, 2400);
    }
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
        let pcScore = document.querySelector('#pc-score')
        pcPoints++
        pcScore.innerHTML = pcPoints
        showResultMessage("You lose...")
    }
    else {
        let playerScore = document.querySelector('#player-score')
        playerPoints++
        playerScore.innerHTML = playerPoints
        showResultMessage("You win!")
    }
}

function showResultMessage(message) {
    let resultMessage = document.querySelector('#result-message')
    resultMessage.innerHTML = message
    setTimeout(() => { resultMessage.innerHTML = ""; }, 2000)
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
    }, 450);
}

function startEffect() {
    addRemoveBorder(0)
    setTimeout(() => {
        addRemoveBorder(1)
    }, 150);
    setTimeout(() => {
        addRemoveBorder(2)
    }, 300);
}

function addRemoveBorder(img) {
    pcImg[img].classList.toggle("pcPlay")
    setTimeout(function () { pcImg[img].classList.toggle("pcPlay") }, 150);
}

function stayOn(img) {
    setTimeout(function () { pcImg[img].classList.add("pcPlay") }, 450);
}

function clearBorder() {
    pcImg[0].classList.remove("pcPlay")
    pcImg[1].classList.remove("pcPlay")
    pcImg[2].classList.remove("pcPlay")
    
    playerColumn.children[0].children[0].classList.remove("pcPlay")
    playerColumn.children[1].children[0].classList.remove("pcPlay")
    playerColumn.children[2].children[0].classList.remove("pcPlay")
}

function stopEffect() {
    clearInterval(interval)
}














