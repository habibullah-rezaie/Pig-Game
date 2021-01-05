/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// init the Game;
let scores,
  roundScores,
  activePlayer,
  dice,
  gameFinished,
  MAX_SCORE;
gameinit();

// btn-roll click event
document.querySelector(".btn-roll").addEventListener("click", function () {
  // 1.random Number
  if (!gameFinished) {
    dice1 = Math.floor(Math.random() * 6) + 1; // Random Number
    dice2 = Math.floor(Math.random() * 6) + 1; // Random Number

    // 2. display the result
    let dicesDOM = document.getElementById('dices');
    dicesDOM.style.display = 'grid';
    let dice1DOM = document.getElementById('dice1');
    let dice2DOM = document.getElementById('dice2');
    dice1DOM.src = "dice-" + dice1 + ".png";
    dice2DOM.src = "dice-" + dice2 + ".png";
    // dice1DOM.style.animation = 'roll1 1s ease-out 1';
    // dice2DOM.style.animation = 'roll2 1s ease-out 1';

    // dice1DOM.animate('')
    // 3. Update the round score if the rolled nmber was not a 1
    if (dice1 !== 1 && dice2 !== 1) {
      roundScores += dice1 + dice2;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScores;
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
    if (scores[activePlayer] >= Number(MAX_SCORE)) {
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
  document.getElementById('dices').style.display = "none";
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
  document.getElementById("score-form").style.display = "block";
  document
    .getElementById("submit-score")
    .addEventListener("click", function () {
      let inputField = document.getElementById("score-input");
      MAX_SCORE = inputField.value;
      if (Number.parseInt(MAX_SCORE))
        document.getElementById("score-form").style.display = "none";
    });

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
