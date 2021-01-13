const min = 1;
const max = 100;
const maxGuess = 10;

let randomNumber = Math.floor(Math.random() * max) + min;

const resultParas = document.querySelector('.resultParas');
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;

let start = 0;
let timeToGuess = 0;

const checkGuess = () => {
  let userGuess = Number(guessField.value);
  if (guessCount === 1) {
    start = Date.now();
    console.log('starting timer...');
    guesses.textContent = 'Previous guesses: ';
  }
  guesses.textContent += userGuess + ' ';

  if (userGuess === randomNumber) {
    lastResult.textContent = 'Congratulations! You got it right!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();

    let resultSummary = document.createElement('div');
    let totalGuesses = document.createElement('p');
    let totalTime = document.createElement('p');

    totalGuesses.innerHTML = 'Your total guess count is ' + guessCount;
    totalTime.innerHTML = 'Your total guess time was ' + Math.floor(timeToGuess / 1000) + ' seconds';

    resultSummary.appendChild(totalGuesses);
    resultSummary.appendChild(totalTime);
    resultParas.appendChild(resultSummary);

    resultSummary.style.backgroundColor = 'lightgrey';

  } else if (guessCount === maxGuess) {
    lastResult.textContent = '!!!GAME OVER!!!';
    setGameOver();
  } else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    if(userGuess < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!';
    } else if(userGuess > randomNumber) {
      lowOrHi.textContent = 'Last guess was too high!';
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

const setGameOver = () => {
  timeToGuess = Date.now() - start;
  console.log(timeToGuess);
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.body.append(resetButton);
  resetButton.addEventListener('click', resetGame);
}

const resetGame = () => {
  guessCount = 1;

  const resetParas = document.querySelectorAll('.resultParas p');
  for (let i = 0 ; i < resetParas.length ; i++) {
    resetParas[i].textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.backgroundColor = 'white';

  randomNumber = Math.floor(Math.random() * max) + min;
}
