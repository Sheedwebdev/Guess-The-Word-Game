//Reps Completed: 1

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
let remainingCount = 8;
let guessedLetters = [];

// Part10: Randomly pick from a word from a list of 800 words 
// API Address: https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"



// Part2: Add placeholders for each letter in the word
const placeholders = function (word) {
  let wordInProgess = [];
  for (const letter of word) {
    wordInProgess.push("?");
  }
//   console.log(wordInProgess);
  progress.innerText = wordInProgess.join("");
};
placeholders(word);


// Part3: Capture the input when the guess button is clicked
guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const capturedInput = input.value;
  console.log(capturedInput);
  input.value = "";

  //Extention of Part4
  inputValidation(capturedInput);
});


// Part4: Validate the player's input
const inputValidation = function (capturedInput) {
    const acceptedLetter = /[a-zA-Z]/;
    if (capturedInput.length === 0) {
    responseMessage.innerText = "You must make a guess first!"; 
  } else if (capturedInput.length > 1) {
    responseMessage.innerText = "Hold on speedy gonzalez, only one guess at a time!"; 
  } else if (!capturedInput.match(acceptedLetter)) {
    responseMessage.innerText = "Only enter letters from A to Z!"
  } else {
    return capturedInput;
  }
};
// Part5: What happens when the player makes a valid input/guess?




// Part6: Display the guessed letters


// Part7: Update the word in progress



// Part8: Count the guesses remaining



// Part9: Let the player know that they won!





// Part11: Give the player the option to start over and play again



// Part12: Add a click event to the play again button
