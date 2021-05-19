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

let initialModal = document.querySelector("#initial-modal")
let game = document.querySelector("#game")
let finishedModal = document.querySelector("#finished-game-modal")

//---- INITIAL MODAL ----//

playerName.onkeydown = () => buttonPressedSound.play()

document.querySelector("#enter-button").onclick = () => {
    setGameMode()
    playerName.value = document.querySelector("#player-name").innerHTML
    if (!playerName.value && gameMode != undefined) {
        backTrack.play()
        initialModal.classList.add("animate__fadeOutRight")
        game.classList.add("animate__fadeInUp")
        setTimeout(() => {
            showView(game)
        }, 250);
    } else alert("Please complete the name and select the game mode.")
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

function playerButtonsProgram() {
    let playerImgs = Array.from(document.querySelectorAll('.player-img'))
    let pcImgs = Array.from(document.querySelectorAll('.pc-img'))
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
    else if (num === 2) return pcChoice = "papper"
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
        showResultMessage("Tie")
    else if ((playerChoice == "rock" && pcChoice == "papper") || 
            (playerChoice == "papper" && pcChoice == "scissors") || 
            (playerChoice == "scissors" && pcChoice == "rock")) {
        showResultMessage("You lose...")
        setTimeout(() => {
            pcPoints++
            pcScore.innerHTML = pcPoints
            if (pcPoints == gameMode) {
                messageHeader.innerHTML = "You've definetly lost..."
                message.innerHTML = "Sometimes in life it is better to give up...or not?"
                backTrack.pause()
                lostSound.play()
                setTimeout(() => endGame(), 800)
            }
        }, 1000);
    }
    else {
        showResultMessage("You win!")
        setTimeout(() => {
            playerPoints++
            playerScore.innerHTML = playerPoints
            if (playerPoints == gameMode) {
                messageHeader.innerHTML = "Congratulations!!"
                message.innerHTML = "Was it all about luck, or you are an actual champion?"
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






