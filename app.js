/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// init the Game;
let scores, roundScores, activePlayer, dice, gameFinished;
gameinit();

// btn-roll click event
document.querySelector(".btn-roll").addEventListener("click", function () {
  // 1.random Number
  if (!gameFinished) {
    dice = Math.floor(Math.random() * 6) + 1; // Random Number

    // 2. display the result
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    // 3. Update the round score if the rolled nmber was not a 1
    if (dice !== 1) {
      roundScores += dice;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScores;
      console.log(activePlayer);
    } else {
      nextPlayer();
    }
  }
});

// btn-hold on click
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (!gameFinished) {
    // add current score to the global score
    scores[activePlayer] += roundScores;

    // update ui
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    // check if player won the game.
    if (scores[activePlayer] >= 10) {
      document.getElementById(`name-${activePlayer}`).textContent = "winner!";
      hideDice();
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove("active");
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add("winner");
      gameFinished = true;
    } else {
      // next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", gameinit);
function hideDice() {
  document.querySelector(".dice").style.display = "none";
}
function nextPlayer() {
  roundScores = 0;
  document.getElementById(`current-${activePlayer}`).textContent = roundScores;
  // change the user
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  // change the active symbol
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  hideDice();
}
function gameinit() {
  scores = [0, 0];
  roundScores = 0;
  activePlayer = 0;
  gameFinished = false;
  // hide dice
  hideDice();
  // set scores and currents to 0
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.getElementById(`name-1`).textContent = "player 2";
  document.getElementById(`name-0`).textContent = "player 1";
  document.querySelector(`.player-0-panel`).classList.remove("winner");
  document.querySelector(`.player-1-panel`).classList.remove("winner");
  document.querySelector(`.player-0-panel`).classList.remove("active");
  document.querySelector(`.player-1-panel`).classList.remove("active");
  document.querySelector(`.player-0-panel`).classList.add("active");
}
