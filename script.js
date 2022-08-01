const subtext = document.querySelector("#subtext");
const player1Score = document.querySelectorAll(".player-score")[0];
const player2Score = document.querySelectorAll(".player-score")[1];
const player1Scoreboard = document.querySelectorAll(".player-scoreboard")[0];
const player2Scoreboard = document.querySelectorAll(".player-scoreboard")[1];
const rollDiceBtn = document.querySelector("#roll-dice");
const resetBtn = document.querySelector("#reset-game");
const doubleBtn = document.querySelector("#double-btn");
let doubleBtnUsedPlayer1 = true;
let doubleBtnUsedPlayer2 = true;
let player1Turn = true;
let scorePlayer1 = 0;
let scorePlayer2 = 0;

function diceRoll(){
    const randomNum = Math.ceil(Math.random() * 6); // 1 - 6
    return randomNum;
}

function active(player1,player2){
    player1.classList.add("active");
    player2.classList.remove("active");
}

function showResetBtn(){
    resetBtn.classList.remove("hiddenBtn");
    rollDiceBtn.classList.add("hiddenBtn");
    doubleBtn.classList.add("hiddenBtn");
}

function usedDoubleBtn(player) {
    if(player){
        doubleBtn.classList.remove("usedBtn");
    } else {
        doubleBtn.classList.add("usedBtn");
    }
}

function winner(){
    if(scorePlayer1 > scorePlayer2 && scorePlayer1 > 21 && player1Turn == true){
        subtext.innerText = "Player 1 Wins 🥳 🥳";
        showResetBtn();
    } else if(scorePlayer2 > scorePlayer1 && scorePlayer2 > 21 && player1Turn == true){
        subtext.innerText = "Player 2 Wins 🎊 🎉";
        showResetBtn();
    }
}

function resetBtnClickHandler(){
    player1Score.innerText = 0;
    player2Score.innerText = 0;
    scorePlayer1 = 0;
    scorePlayer2 = 0;
    player1Scoreboard.textContent = "-";
    player2Scoreboard.textContent = "-";
    subtext.textContent = "Start the Game";
    resetBtn.classList.add("hiddenBtn");
    rollDiceBtn.classList.remove("hiddenBtn");
    doubleBtn.classList.remove("hiddenBtn");
    player2Scoreboard.classList.remove("active");
}

function rollDiceBtnClickHandler(){
    const num = diceRoll();
    if(player1Turn){
        scorePlayer1 += num;
        player1Score.textContent = scorePlayer1;
        player1Scoreboard.textContent = num;
        player1Turn = false;
        active(player1Scoreboard,player2Scoreboard);
        usedDoubleBtn(doubleBtnUsedPlayer2);
    } else {
        scorePlayer2 += num;
        player2Score.textContent = scorePlayer2;
        player2Scoreboard.textContent = num;
        player1Turn = true;
        active(player2Scoreboard,player1Scoreboard);
        usedDoubleBtn(doubleBtnUsedPlayer1);
    }

    winner();
}

function doubleOrNothing(score, playerScore,playerScoreboard) {
    let num = diceRoll();
    let double = num * 2;
    if(num % 2 === 0){
        console.log(score);
        score += double;
        playerScore.innerText = score;
        playerScoreboard.innerText = num;
    } else {        
        console.log(score);
        score -= double;
        playerScore.innerText = score;
        playerScoreboard.innerText = num;
    }

    if(player1Turn){
        scorePlayer1 = score;
    } else {
        scorePlayer2 = score;
    }
}

function doubleBtnClickHandler() {
    if(player1Turn){
        if(!doubleBtnUsedPlayer1){
            return;
        }
        doubleOrNothing(scorePlayer1,player1Score,player1Scoreboard);
        player1Turn = false;
        active(player1Scoreboard,player2Scoreboard);
        doubleBtnUsedPlayer1 = false;
        usedDoubleBtn(doubleBtnUsedPlayer2);
    } else {
        if(!doubleBtnUsedPlayer2){
            return;
        }
        doubleOrNothing(scorePlayer2,player2Score,player2Scoreboard);
        player1Turn = true;
        active(player2Scoreboard,player1Scoreboard);
        doubleBtnUsedPlayer2 = false;
        usedDoubleBtn(doubleBtnUsedPlayer1);
    }

    winner();
}


rollDiceBtn.addEventListener("click", rollDiceBtnClickHandler);
resetBtn.addEventListener("click", resetBtnClickHandler);
doubleBtn.addEventListener("click", doubleBtnClickHandler);