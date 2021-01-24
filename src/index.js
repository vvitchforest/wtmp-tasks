/*Strategy for finding the random number is to split the search range in half each time search is done */

guessNumber = () => {
  let min = 1;
  let max = 100;
  let randNum = Math.floor(Math.random() * max) + min;
  let guessHistory = [];

  //Loops until the random number is found
  while (true) {

    /*Guess is always based on min and max boundaries, whis are updated with each iteration of loop */
    let guess = Math.floor((min + max) / 2);

    guessHistory.push(guess);
    //Breaks when the correct number is found
    if (randNum === guess) {
      console.log('Random number is correct! ' + guess);
      break;
    }
    /*If guess is smaller than random number, guess+1 becomes current minimum boundary
    (lower numbers are no longer guessed)*/
    if (randNum > guess) {
      console.log('Greater than ' + guess);
      min = guess + 1;
    }
    /*Ig guess is greater than the random number, guess-1 becomes a new maximum boundary,
    and higher numbers are no longer guessed */
    if (randNum < guess) {
      console.log('Smaller than ' + guess);
      max = guess - 1;
    }
    console.log('next loop');
  }
  console.log("Guess history: " + guessHistory);
  console.log("Total number of guesses: " + guessHistory.length);
  return guessHistory;
};

//Testing 1500 times
const iterations = 1500;
let totalGuesses = 0;
let maxGuessCount = 0;
let minGuessCount = 10;
for (let i = 0; i < 1500; i++) {
  let currentGuessCount = guessNumber().length;
  totalGuesses += currentGuessCount;
  if(currentGuessCount > maxGuessCount) {
    maxGuessCount = currentGuessCount;
  }
  if(currentGuessCount < minGuessCount) {
    minGuessCount = currentGuessCount;
  }
};
//Average number of total guess count is around 5.8
let averageGuesses = (totalGuesses / iterations).toFixed(2);
console.log("Average number of total guess count: " + averageGuesses);
//At most it takes 7 guesses (max guess)
console.log('Most guesses ' + maxGuessCount);
//Smallest guess count is 1
console.log('Least guesses ' + minGuessCount);
