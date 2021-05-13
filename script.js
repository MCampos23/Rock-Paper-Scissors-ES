let playerColumn = document.querySelector('#player-column')
let pcImgs = Array.from(document.querySelectorAll('.pc-img'))
let playerImgs = Array.from(document.querySelectorAll('.player-img'))
let playerPoints = 0
let pcPoints = 0
let playerChoice
let pcChoice 
let interval
let finished = true

playerImgs.forEach(playerImg)=>{
    playerImg.onclick = (e) => {
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
}
function pcPlay() {
    num = Math.ceil(Math.random() * 3)
    if (num == 1)
    pcChoice = "rock"
    else if (num == 2)
    pcChoice = "papper"
    else
    pcchoice = "scissors"
    return pcChoice
}

function compareResult() {
    if (pcChoice == playerchoice)
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
    pcImg.forEach(pcImg)=> pcImg.classLisst.remove("pcPlay")
    playerColumn.children.forEach(child)=> child.remove("pcPlay")
}

function stopEffect() {
    clearInterval(interval)
}














