let score = JSON.parse(localStorage.getItem('score')) || {
          wins: 0,
          losses: 0,
          ties: 0
        };

updateScoreElement();

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/

let isAutoPlaying = false;
let intervalID;

/*
const autoPlay = () => {

};
*/
function autoPlay() {
  if (!isAutoPlaying) {
    intervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.js-auto-play-button')
      .innerHTML = 'Stop Playing';
  } else {
    clearInterval(intervalID);
    isAutoPlaying = false;

    document.querySelector('.js-auto-play-button')
      .innerHTML = 'Auto Play';
  }
}

const autoPlayButton = document.querySelector('.js-auto-play-button');

autoPlayButton.addEventListener('click', () => {
  autoPlay();
});

/*
document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => {
    autoPlay();
}); It will give the same result as the function above.
*/

document.querySelector('.js-rock-btn')
  .addEventListener('click', () => {
    playGame('rock');
    document.querySelector('.js-reset')
     .innerHTML = '';
  });

document.querySelector('.js-paper-btn')
  .addEventListener('click', () => {
    playGame('paper');
    document.querySelector('.js-reset')
     .innerHTML = '';
  });

document.querySelector('.js-scissors-btn')
  .addEventListener('click', () => {
    playGame('scissors');
    document.querySelector('.js-reset')
     .innerHTML = '';
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
    document.querySelector('.js-reset')
      .innerHTML = '';
  } else if (event.key === 'p') {
    playGame('paper');
    document.querySelector('.js-reset')
      .innerHTML = '';
  } else if (event.key === 's') {
    playGame('scissors');
    document.querySelector('.js-reset')
      .innerHTML = '';
  } else if (event.key === 'a') {
    autoPlay();
    document.querySelector('.js-reset')
      .innerHTML = '';
  } else if (event.key === 'Backspace') {
    resetScore();
    document.querySelector('.js-reset')
      .innerHTML = '';
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();


if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
    result = 'You lose.';
  } else if (computerMove === 'paper') {
    result = 'You win.';
  } else if (computerMove === 'scissors') {
    result = 'Tie.';
  }

} else if (playerMove === 'paper') {
  if (computerMove === 'rock') {
    result = 'You win.';
  } else if (computerMove === 'paper') {
    result = 'Tie.';
  } else if (computerMove === 'scissors') {
    result = 'You lose.';
  }

} else if (playerMove === 'rock') {
  if (computerMove === 'rock') {
    result = 'Tie.';
  } else if (computerMove === 'paper') {
    result = 'You lose.';
  } else if (computerMove === 'scissors') {
    result = 'You win.';
  }
}

if (result === 'You win.') {
  score.wins ++;
} else if (result === 'You lose.') {
  score.losses ++;
} else if (result === 'Tie.') {
  score.ties ++;
}

localStorage.setItem('score', JSON.stringify(score));

updateScoreElement();

document.querySelector('.js-result')
    .innerHTML = result;

document.querySelector('.js-moves')
  .innerHTML = `You picked <img src="images/${playerMove}-emoji.png" class="move-icon">. Computer picked <img src="images/${computerMove}-emoji.png" class="move-icon">.`

if (result === 'Wins: 0, Losses: 0, Ties: 0.') {
  document.querySelector('.js-reset')
      .innerHTML = 'The score has been reset.';
}

}

function updateScoreElement() {
  document.querySelector('.js-score')
      .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
  // return is used to get a value out of a function.
}

function resetScore() {
  score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    localStorage.removeItem('score');
    updateScoreElement();

    document.querySelector('.js-reset')
      .innerHTML = 'The score has been reset.';

    document.querySelector('.js-moves').innerHTML = '';
    document.querySelector('.js-result').innerHTML = '';
}

document.querySelector('.js-reset-score-btn')   
  .addEventListener('click', () => {
    // resetScore();

    showResetConfirmation();
});

function showResetConfirmation() {
  document.querySelector('.js-reset-confirmation')
    .innerHTML = `
      Are you sure you want to reset the score?
      <button class="js-confirm-reset-yes reset-confirm-button">
        Yes
      </button>
      <button class="js-confirm-reset-no reset-confirm-button">
        No
      </button>
    `;

    document.querySelector('.js-confirm-reset-yes')
      .addEventListener('click', () => {
        resetScore();
        hideResetConfirmation();
      });

    document.querySelector('.js-confirm-reset-no')
      .addEventListener('click', () => {
        hideResetConfirmation();
      });
}

function hideResetConfirmation() {
  document.querySelector('.js-reset-confirmation')
    .innerHTML = '';
}