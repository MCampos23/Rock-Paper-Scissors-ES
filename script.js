let playerImgs = Array.from(document.querySelectorAll('.player-img'))
let pcImgs = Array.from(document.querySelectorAll('.pc-img'))
let playerPoints = 0
let pcPoints = 0
let playerChoice
let pcChoice 
let gameOnCourse = false

let playerName = document.querySelector("#name")
let enterButton = document.querySelector("#enter-button")
let gameModeOptions = Array.from(document.querySelectorAll("input[type='radio']"))
let gameMode 



enterButton.onclick= () =>{
    setGameMode()
    if(playerName.value!="" && gameMode!=undefined){
        playerName.innerHTML= playerName.value
        document.querySelector("#game").classList.toggle("hidden")
        document.querySelector("#modal").classList.toggle("hidden")   
    }else alert("Please complete the name and select the game mode.")
}

function setGameMode(){
    gameModeOptions.forEach(gameModeOption =>
        {if(gameModeOption.checked) gameMode=gameModeOption.id})
}
function playerButtonsProgram(){
    playerImgs.forEach(playerImg => {
        playerImg.onclick = (e) => {
            if(!gameOnCourse){
                gameOnCourse = true
                setStyles(e.target)
                setPcChoice()
                playerChoice = e.target.alt
                pcPlayEffect()
                setTimeout(() => {
                    compareResult()
                    gameOnCourse = false
                }, 2400);
            }
        }
    })
}

function setStyles(img) {
    pcImgs.forEach( pcImg => pcImg.classList.remove("pcPlay"))
    playerImgs.forEach( playerImg => playerImg.classList.remove("pcPlay"))
    img.classList.add("pcPlay")
}

function setPcChoice() {
    let num = Math.ceil(Math.random() * 3)
    if (num === 1) pcChoice = "rock"
    else if (num === 2) pcChoice = "papper"
    else if(num === 3) pcChoice = "scissors" 
}

function compareResult() {
    if (pcChoice == playerChoice)
        showResultMessage("Tie")
    else if ((playerChoice == "rock" && pcChoice == "papper") || (playerChoice == "papper" && pcChoice == "scissors") || (playerChoice == "scissors" && pcChoice == "rock")) {
        showResultMessage("You lose...")
        setTimeout(() => {
            let pcScore = document.querySelector('#pc-score')
            pcPoints++
            pcScore.innerHTML = pcPoints
            if(pcPoints==gameMode) setTimeout(()=> endGame(),1000) 
        }, 1200);
    }
    else {
        showResultMessage("You win!")
        setTimeout(() => {
            let playerScore = document.querySelector('#player-score')
            playerPoints++
            playerScore.innerHTML = playerPoints
            if(playerPoints==gameMode) setTimeout(()=> endGame(),1000) 
        }, 1200);
    }
}
function endGame(){
    document.querySelector("#game").classList.toggle("hidden")
    document.querySelector("#modal-finished").classList.toggle("hidden")

}

function showResultMessage(message) {
    let resultMessage = document.querySelector('#result-message')
    resultMessage.innerHTML = message
    setTimeout(() => { resultMessage.innerHTML = ""; }, 1500)
}

let interval
function pcPlayEffect() {
    let counter = 0;
    startEffect();
    interval = setInterval(() => {
        counter++;
        if (counter >= 3) {
            stopEffect();
            if (pcChoice === "rock") {
                stayOn(0);
            } else if (pcChoice === "papper") {
                stayOn(1);
            } else if (pcChoice === "scissors") {
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
    pcImgs[img].classList.toggle("pcPlay")
    setTimeout(function () { pcImgs[img].classList.toggle("pcPlay") }, 150);
}

function stayOn(img) {
    setTimeout(function () { pcImgs[img].classList.add("pcPlay") }, 470);
}

function stopEffect() {
    clearInterval(interval)
}

playerButtonsProgram()













