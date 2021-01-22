const min = 1;
const max = 100;
const maxGuess = 10;

let randNum = Math.floor(Math.random() * max) + min;
let guessCount = 1;
let guess = Math.ceil((max-min)/2);
let guessArray = [];
guessArray.push(0);

while(guessCount <= 10 && guess !== randNum) {
  if(randNum > guess) {
    guess = guess + (guess - guessArray[guessArray.length-1])/2;
  } else if (randNum < guess) {
    guess = guess - (guess - guessArray[guessArray.length-1])/2;
  }
  guessArray.push(guess);
  guessCount++;
};

console.log(randNum);
console.log(guessArray);

