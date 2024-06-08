//Part1: Global Variables
const responseMessage = document.querySelector(".message");
const progress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
// console.log(remainingSpan);
const guess = document.querySelector(".guessed-letters");
const input = document.querySelector(".letter");
const guessButton = document.querySelector(".guess");
const playAgainButton = document.querySelector(".play-again");
let word = "magnolia";
let guessedLetters = [];
let countRemaining = 8;

// Part2: Add placeholders for each letter in the word
const placeholders = function (word) {
  const placeholdersArray = [];
  for (const letter of word) {
    placeholdersArray.push("*");
  }
  // console.log(placeholdersArray);
  progress.innerText = placeholdersArray.join("");
};
placeholders(word);


// Part3: Capture the input when the guess button is clicked
guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const capturedInput = input.value;
  // console.log(capturedInput);
  responseMessage.innerText = "";

  //Extention of Part4
  const inputValidated =  validInput(capturedInput);
  // console.log(inputValidated);

  //Extention of Part5
  if (inputValidated) {
    makeValidGuess(capturedInput);
  }
  input.value = "";
});




// Part4: Validate the player's input
const validInput = function (capturedInput) {
  const acceptedLetter = /[a-zA-Z]/;
  if (capturedInput.length === 0) {
    responseMessage.innerText = "Please enter a value";
  } else if (capturedInput.length > 1) {
    responseMessage.innerText = "Don't get carried away!  Only enter one letter at a time!";
  } else if (!capturedInput.match(acceptedLetter)) {
    responseMessage.innerText = "Only enter letters from A to Z!";
  } else {
    return capturedInput;
  }
};


// Part5: What happens when the player makes a valid input/guess?
const makeValidGuess = function (capturedInput) {
  const upperGuess = capturedInput.toUpperCase();
  if (guessedLetters.includes(upperGuess)) {
    responseMessage.innerText = "You must have dementia, you already made the guess!";
  } else {
    guessedLetters.push(upperGuess);
    // console.log(guessedLetters);

    //Extention of Part6
    displayGuesses();

    //Extention of Part7
    updatedProgress(guessedLetters);

    //Extention of Part8
    remainingGuesses(capturedInput);
  }
};



// Part6: Display the guessed letters
const displayGuesses = function () {
  guess.innerHTML = "";
  // console.log(guess);
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guess.append(li);
  }
};


// Part7: Update the word in progress
const updatedProgress = function (guessedLetters) {
  const upperWord = word.toUpperCase();
  const wordArray = upperWord.split("");
  // console.log(wordArray);
  const displayWord = [];
  // console.log(displayWord);
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      displayWord.push(letter.toUpperCase());
    } else {
      displayWord.push("*");
    }
  }
  progress.innerText = displayWord.join("");
  
  //Extention of Part9
  winner();
};


// Part8: Count guesses remaining
const remainingGuesses = function (capturedInput) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(capturedInput)) {
    responseMessage.innerText = `The letter ${capturedInput} is not in the word.`;
    countRemaining -= 1;
  } else {
    responseMessage.innerText = `Great Job!!! The letter ${capturedInput} is in the word!!!`;
  }
  if (countRemaining === 0) {
    responseMessage.innerHTML = `The game is over! The word is <span class="highlight">${word}</span>.`;
  } else if (countRemaining === 1) {
    remainingSpan.innerText = `${countRemaining} guess`;
  } else {
    remainingSpan.innerText = `${countRemaining} guesses`;
  }
};



// Part9: Let the player know that they won!
const winner = function () {
  if (word.toUpperCase() === progress.innerText) {
    responseMessage.classList.add("win");
    responseMessage.innerHTML = `<p class="highlight">${word} is the correct word!!! Impressive lexicon you have!!!</p>`;
    console.log(responseMessage);
  }
};


// Part10: Randomly pick from a word from a list of 800 words 




// Part11: Give the player the option to start over and play again




// Part12: Add a click event to the play again button