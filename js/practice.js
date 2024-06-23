//Reps Completed: 2

//Part1: Global Variables
const responseMessage = document.querySelector(".message");
const progress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const guess = document.querySelector(".guessed-letters");
const input = document.querySelector(".letter");
const guessButton = document.querySelector(".guess");
const playAgainButton = document.querySelector(".play-again");
let word = "enahora";
let guessedLetters = [];
let remainingCount = 8;


// Part10: Randomly pick from a word from a list of 800 words 
// API Address: https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"



// Part2: Add placeholders for each letter in the word
const placeholders = function (word) {
  const placeholdersArray = [];
  for (const letter of word) {
     placeholdersArray.push("?");
  }
  // console.log(placeholdersArray);
  progress.innerText = placeholdersArray.join("");
};

placeholders(word);


// Part3: Capture the input when the guess button is clicked
guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const capturedValue = input.value;
  // console.log(capturedValue);
  input.value = "";

  //Extention of Part4
  const goodGuess = validGuess(capturedValue);

  //Extention of Part5
  if (goodGuess) {
    makeGuess(capturedValue);
  }
});


// Part4: Validate the player's guess
const validGuess = function (capturedValue) {
  const acceptedLetters = /[a-zA-Z]/;
  if (capturedValue.length === 0) {
    responseMessage.innerText = "Please enter a value!!!";
  } else if (capturedValue.length > 1) {
    responseMessage.innerText = "Wait just minute!!! Take your time and provide one guess at a time!!!";
  } else if (!capturedValue.match(acceptedLetters)) {
    responseMessage.innerText = "Be logical!!! Only enter values from A to Z!!!";
  } else {
    return capturedValue;
  }
};


// Part5: What happens when the player makes a valid guess?
const makeGuess = function (capturedValue) {
  // const upperGuess = capturedValue.toUpperCase();
  capturedValue = capturedValue.toUpperCase();
  if (guessedLetters.includes(capturedValue)) {
    responseMessage.innerText = "Make sure to look at the displayed guesses!  It shows you that you have already made that guess."
  } else {
    guessedLetters.push(capturedValue);
  }
  // console.log(guessedLetters);

  //Extention of Part8
  remainingGuesses(capturedValue);

  //Extention of Part6
  displayedGuesses();

   //Extention of Part7
   wordInProgress(guessedLetters);
};

 

// Part6: Display the guessed letters
const displayedGuesses = function () {
  guess.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guess.append(li);
  }
  // console.log(guess);
};


// Part7: Update the word in progress
const wordInProgress = function (guessedLetters) {
  const upperWord = word.toUpperCase();
  const wordArray = upperWord.split("");
  const updatedWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      updatedWord.push(letter.toUpperCase());
    } else {
      updatedWord.push("?");
    }
  }
  progress.innerText = updatedWord.join("");

  //Extention of Part9
  winner();
};


// Part8: Count the guesses remaining
const remainingGuesses = function (capturedValue) {
  const upperWord = word.toUpperCase();
  const upperGuess = capturedValue.toUpperCase();
  console.log(upperWord);
  console.log(upperGuess);
  // if (!upperWord.match(capturedValue)) {
  if (!upperWord.includes(capturedValue)) {
    remainingCount -= 1;
    remainingSpan.innerText = `${remainingCount} guesses`;
    responseMessage.innerText = `Incorrect! The letter ${upperGuess} is not in the word!`;
  } else {
    responseMessage.innerText = `Correct!!! The letter ${upperGuess} is in the word!`;
  }
  
  
  if (remainingCount === 0) {
    responseMessage.innerHTML = `Sorry, the game is over. The word is <span class="highlight">${upperWord}</span>.`;
  } else if (remainingCount === 1) {
    remainingSpan.innerText = `${remainingCount} guess`;
  } else {
    remainingSpan.innerText = `${remainingCount} guesses`;
  }
};


// Part9: Let the player know that they won!
const winner = function () {
  const upperWord = word.toUpperCase();
  if (upperWord === progress.innerText) {
    responseMessage.innerHTML = `<p class="highlight">Great job!!! ${upperWord} is the secret word!!! You must have psychic powers!!!</p>;`
    responseMessage.classList.add("win");
  }
};


// Part11: Give the player the option to start over and play again



// Part12: Add a click event to the play again button
