let playerName = document.querySelector("#name")
let gameModeOptions = Array.from(document.querySelectorAll("input[type='radio']"))
let gameMode

let playerScore = document.querySelector('#player-score')
let pcScore = document.querySelector('#pc-score')
let playerPoints = 0
let pcPoints = 0
let gameOnCourse = false

//---- Audio ----//
let buttonPressedSound = document.querySelector("#button-pressed")
let backTrack = document.querySelector("#back-track")
let hoverSound = document.querySelector("#hover-sound")
let lostSound = document.querySelector("#lost")
let winSound = document.querySelector("#win")
let pcPlaySound = document.querySelector("#pc-play-sound")
winSound.volume = 0.7

//--- Views ---//
let initialModal = document.querySelector("#initial-modal")
let game = document.querySelector("#game")
let finishedModal = document.querySelector("#finished-game-modal")

//---- INITIAL MODAL ----//

playerName.onkeydown = () => buttonPressedSound.play()

document.querySelector("#enter-button").onclick = () => {
    setGameMode()    
    if (playerName.value!="" && gameMode != undefined) {
        document.querySelector("#player-name").innerHTML = playerName.value
        backTrack.play()
        initialModal.classList.add("animate__fadeOutRight")
        game.classList.add("animate__fadeInUp")
        setTimeout(() => {
            showView(game)
        }, 250);
    } else alert("Por favor completa el nombre y selecciona un modo de juego.")
}

function showView(view) {
    initialModal.classList.add('hidden')
    game.classList.add('hidden')
    finishedModal.classList.add('hidden')
    view.classList.remove('hidden')
}

function setGameMode() {
    gameModeOptions.forEach(gameModeOption => { if (gameModeOption.checked) return gameMode = gameModeOption.id })
}

//---- GAME ----//

let playerImgs = Array.from(document.querySelectorAll('.player-img'))
let pcImgs = Array.from(document.querySelectorAll('.pc-img'))
function playerButtonsProgram() {
    let pcChoice
    let playerChoice
    playerImgs.forEach(playerImg => {
        playerImg.addEventListener("mouseover", function () {
            hoverSound.play()
        })
        playerImg.onclick = (e) => {
            if (!gameOnCourse) {
                gameOnCourse = true
                playerChoice = e.target.alt
                setPcChoice()
                setBorder(e.target)
                pcPlayEffect(pcChoice)
                setTimeout(() => {
                    compareResult(pcChoice, playerChoice)
                    gameOnCourse = false
                }, 2400);
            }
        }
    })
}

function setPcChoice() {
    let num = Math.ceil(Math.random() * 3)
    if (num === 1) return pcChoice = "rock"
    else if (num === 2) return pcChoice = "paper"
    else if (num === 3) return pcChoice = "scissors"
    return pcChoice
}

function setBorder(img) {
    pcImgs.forEach(pcImg => pcImg.classList.remove("pcPlay"))
    playerImgs.forEach(playerImg => playerImg.classList.remove("pcPlay"))
    if (img) img.classList.add("pcPlay")
}

function compareResult(pcChoice, playerChoice) {
    let messageHeader = document.querySelector("#message-header")
    let message = document.querySelector("#message")
    if (pcChoice == playerChoice)
        showResultMessage("Empate")
    else if ((playerChoice == "rock" && pcChoice == "paper") || 
            (playerChoice == "paper" && pcChoice == "scissors") || 
            (playerChoice == "scissors" && pcChoice == "rock")) {
        showResultMessage("Pierdes...")
        setTimeout(() => {
            pcPoints++
            pcScore.innerHTML = pcPoints
            if (pcPoints == gameMode) {
                messageHeader.innerHTML = "Oh...has perdido..."
                message.innerHTML = "A veces en la vida es mejor abandonar...o no?"
                backTrack.pause()
                lostSound.play()
                setTimeout(() => endGame(), 800)
            }
        }, 1000);
    }
    else {
        showResultMessage("Ganas!")
        setTimeout(() => {
            playerPoints++
            playerScore.innerHTML = playerPoints
            if (playerPoints == gameMode) {
                messageHeader.innerHTML = "Enhorabuena!!"
                message.innerHTML = "Fué cuestión de suerte, o eres inbatible de verdad?"
                backTrack.pause()
                winSound.play()
                setTimeout(() => endGame(), 800)
            }
        }, 1000);
    }
}

function showResultMessage(message) {
    let resultMessage = document.querySelector('#result-message')
    resultMessage.innerHTML = message
    setTimeout(() => { resultMessage.innerHTML = ""; }, 1300)
}

function endGame() {
    showView(finishedModal)
    finishedModal.classList.remove("animate__fadeOutRight")
}

playerButtonsProgram()

//---- Pc Play Effect ----//

let interval

function pcPlayEffect() {
    let counter = 0;
    pcPlaySound.play()
    startEffect();
    interval = setInterval(() => {
        counter++;
        if (counter >= 3) {
            stopEffect();
            if (pcChoice === "rock") {
                stayOn(0);
            } else if (pcChoice === "paper") {
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

function stopEffect() {
    clearInterval(interval)
}

function addRemoveBorder(img) {
    pcImgs[img].classList.toggle("pcPlay")
    setTimeout(function () { pcImgs[img].classList.toggle("pcPlay") }, 150);
}

function stayOn(img) {
    setTimeout(function () { pcImgs[img].classList.add("pcPlay") }, 470);
}

//---- FINISHED GAME MODAL WINDOW ----//

let playAgainButton = document.querySelector("#play-again-button")
let exitButton = document.querySelector("#exit-button")

playAgainButton.onclick = () => {
    resetScore()
    setBorder()
    backTrack.play()
    finishedModal.classList.add("animate__fadeOutRight")
    setTimeout(() => { endGame() }, 250);
}

exitButton.onclick = () => {
    resetScore()
    setBorder()
    playerName.value = ""
    finishedModal.classList.add("animate__fadeOutRight")
    gameModeOptions.forEach(gameModeOption => { if (gameModeOption.checked) return gameModeOption.checked = false })
    setTimeout(() => {
        initialModal.classList.add("animate__fadeInLeft")
        initialModal.classList.remove("animate__fadeOutRight")
        showView(initialModal)
    }, 250);
}

function resetScore() {
    pcPoints = 0
    playerPoints = 0
    pcScore.innerHTML = 0
    playerScore.innerHTML = 0
}






