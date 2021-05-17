let messageHeader = document.querySelector("#message-header")
let message = document.querySelector("#message")
let backTrack = document.querySelector("#back-track")
// INITIAL MODAL WINDOW
let playerName = document.querySelector("#name")
let enterButton = document.querySelector("#enter-button")
let gameModeOptions = Array.from(document.querySelectorAll("input[type='radio']"))
let gameMode
let buttonPressed = document.querySelector("#button-pressed")
playerName.onkeydown = function(){buttonPressed.play()}

enterButton.onclick = () => {
    setGameMode()
    if (playerName.value != "" && gameMode != undefined) {
        backTrack.play()
        document.querySelector("#player-name").innerHTML = playerName.value
        document.querySelector("#initial-modal").classList.add("animate__fadeOutRight")
        document.querySelector("#game").classList.add("animate__fadeInUp")
        setTimeout(() => {
            document.querySelector("#initial-modal").classList.add("hidden")
            document.querySelector("#game").classList.toggle("hidden")
        }, 250);

    } else alert("Please complete the name and select the game mode.")
}

function setGameMode() {
    gameModeOptions.forEach(gameModeOption => { if (gameModeOption.checked) return gameMode = gameModeOption.id })
}

// GAME VIEW 
let playerImgs = Array.from(document.querySelectorAll('.player-img'))
let pcImgs = Array.from(document.querySelectorAll('.pc-img'))
let playerPoints = 0
let pcPoints = 0
let playerChoice
let pcChoice
let gameOnCourse = false
let pcScore = document.querySelector('#pc-score')
let playerScore = document.querySelector('#player-score')
let hoverSound = document.querySelector("#hover-sound")
let lostSound = document.querySelector("#lost")
let winSound = document.querySelector("#win")
let pcPlaySound = document.querySelector("#pc-play-sound")
winSound.volume = 0.7

function playerButtonsProgram() {
    playerImgs.forEach(playerImg => {
        playerImg.addEventListener("mouseover", function(){
            hoverSound.play()
        })
        playerImg.onclick = (e) => {
            if (!gameOnCourse) {
                gameOnCourse = true
                pcPlaySound.play()
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
    pcImgs.forEach(pcImg => pcImg.classList.remove("pcPlay"))
    playerImgs.forEach(playerImg => playerImg.classList.remove("pcPlay"))
    if (img) img.classList.add("pcPlay")
}

function setPcChoice() {
    let num = Math.ceil(Math.random() * 3)
    if (num === 1) pcChoice = "rock"
    else if (num === 2) pcChoice = "papper"
    else if (num === 3) pcChoice = "scissors"
}

function compareResult() {
    if (pcChoice == playerChoice)
        showResultMessage("Tie")
    else if ((playerChoice == "rock" && pcChoice == "papper") || (playerChoice == "papper" && pcChoice == "scissors") || (playerChoice == "scissors" && pcChoice == "rock")) {
        showResultMessage("You lose...")
        setTimeout(() => {
            pcPoints++
            pcScore.innerHTML = pcPoints
            if(pcPoints == gameMode) {
                messageHeader.innerHTML="You've definetly lost..."
                message.innerHTML="Sometimes in life it is better to give up...or not?"
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
            if (playerPoints == gameMode){
                messageHeader.innerHTML="Congratulations!!"
                message.innerHTML="Was it all about luck, or you are an actual champion?"
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

function endGame (){
    document.querySelector("#game").classList.toggle("hidden")
    document.querySelector("#finished-game-modal").classList.toggle("hidden")
    document.querySelector("#finished-game-modal").classList.remove("animate__fadeOutRight")
}
 // Play effect

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

// FINISHED GAME MODAL WINDOW

let playAgainButton = document.querySelector("#play-again-button")
let exitButton = document.querySelector("#exit-button")

playAgainButton.onclick=()=>{
    document.querySelector("#finished-game-modal").classList.add("animate__fadeOutRight")
    resetScore()
    setTimeout(() => { endGame() }, 250); 
    setStyles()
    backTrack.play()
}
exitButton.onclick=()=>{
    document.querySelector("#finished-game-modal").classList.add("animate__fadeOutRight")
    resetScore()
    setStyles()
    playerName.value=""
    gameModeOptions.forEach(gameModeOption => { if (gameModeOption.checked) return gameModeOption.checked=false })
    setTimeout(() => {
        document.querySelector("#finished-game-modal").classList.toggle("hidden")
        document.querySelector("#initial-modal").classList.add("animate__fadeInLeft")    
        document.querySelector("#initial-modal").classList.remove("animate__fadeOutRight")    
        document.querySelector("#initial-modal").classList.remove("hidden")    
    }, 250);
}
 function resetScore(){
    pcPoints=0
    playerPoints=0
    pcScore.innerHTML=0
    playerScore.innerHTML=0 
 }







