//Reps Completed: 5

//Part1: Global Variables
const responseMessage = document.querySelector(".message");
const progress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const guess = document.querySelector(".guessed-letters");
const input = document.querySelector(".letter");
const guessButton = document.querySelector(".guess");
const playAgainButton = document.querySelector(".play-again");

let secretWord = "shaheedah";
let guessedLetters = [];
let remainingGuesses = 8;


// Part10: Randomly pick a word from a list of 823 words 
// API Address: https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt


// Part2: Add placeholders for each letter in the word
const placeholders = function (secretWord) {
  const placeholderArray = [];
  
  for (const letter of secretWord) {
    placeholderArray.push("*");
  }
  progress.innerText = placeholderArray.join("");
};
placeholders(secretWord);


// Part3: Capture the input when the guess button is clicked
guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const capturedGuess = input.value;
  //Extention of Part4
  const goodGuess = validatedGuess(capturedGuess);
  //Extention of Part5
  if (goodGuess) {
    renderUpdates(capturedGuess);
  }
  input.value = "";
});  


// Part4: Validate the player's guess
const validatedGuess = function (capturedGuess) {
  const acceptedLetters = /[a-zA-Z]/;
  
  if (capturedGuess.length === 0) {
    responseMessage.innerText = "Please enter a value first!"
  } else if (capturedGuess.length > 1) {
    responseMessage.innerText = "Please only enter one letter at a time!"
  } else if (!capturedGuess.match(acceptedLetters)) {
    responseMessage.innerText = "Please only enter letters from A to Z!"
  } else {
    return capturedGuess;
  }
};


// Part5: What happens when the player makes a valid guess?
const renderUpdates = function (capturedGuess) {
	const upperGuess = capturedGuess.toUpperCase();
  
  if (guessedLetters.includes(upperGuess)) {
    responseMessage.innerText = "You already made that guess!";
  } else {
    guessedLetters.push(upperGuess);
    responseMessage.innerText = "";
  }
  
  //Extention of Part 8
  renderRemainingGuesses(capturedGuess);

  //Extention of Part 6
  renderGuesses();
     
  //Extention of Part 7
  renderWordInProgress(guessedLetters);
};


// Part6: Display the guessed letters
const renderGuesses = function() {
  guess.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guess.append(li);
  }
};


// Part7: Update the word in progress
const renderWordInProgress = function (guessedLetters) {
  const upperWord = secretWord.toUpperCase();
  const upperWordArray = upperWord.split("");
  const progressArray = [];

  for (const letter of upperWordArray) {
    if (guessedLetters.includes(letter)) {
      progressArray.push(letter)
    } else {
      progressArray.push("*")
    }
  }
  progress.innerText = progressArray.join("");
};


// Part8: Count the guesses remaining
const renderRemainingGuesses = function (capturedGuess) {
  const upperWord = secretWord.toUpperCase();
  const upperGuess = capturedGuess.toUpperCase();
  
  if (!upperWord.includes(upperGuess)) {
    responseMessage.innerText = `Incorrect! The letter ${upperGuess} is not in the word.`;
    remainingGuesses -= 1;
    remainingSpan.innerText = `${remainingGuesses} guesses`;
  } else {
    responseMessage.innerText = `Correct!!! The letter ${upperGuess} is in the word!!!`;
  }

  if (remainingGuesses === 1) {
    remainingSpan.innerText = `${remainingGuesses} guess`;
  } else if (remainingGuesses === 0) {
    responseMessage.innerHTML = `You ran out of guesses!  The word is <span class="highlight">${upperWord}</span>.`
  } else {
    remainingSpan.innerText = `${remainingGuesses} guesses`;
  }
};


// Part9: Let the player know that they won!



// Part11: Give the player the option to start over and play again



// Part12: Add a click event to the play again button


  



