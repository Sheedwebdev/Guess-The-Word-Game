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
const getNewWord = async function () {
  const getData = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  // console.log(getData);
  const getWords = await getData.text();
  // console.log(getWords);
  const arrayOfWords = getWords.split("\n");
  // console.log(arrayOfWords);
  const randomIndex = Math.floor(Math.random()*arrayOfWords.length);
  word = arrayOfWords[randomIndex];
  console.log(word);
  placeholders(word);
};
getNewWord();


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
  // console.log(capturedInput);
  input.value = "";

  //Extention of Part4
  const validGuess = inputValidation(capturedInput);
  if (validGuess) {
    makeGuess(capturedInput);
  }
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
const makeGuess = function (capturedInput) {
  capturedInput = capturedInput.toUpperCase();
  if (guessedLetters.includes(capturedInput)) {
    responseMessage.innerText = "You must have dementia, you have already made that guess.";
  } else {
    guessedLetters.push(capturedInput);
    // console.log(guessedLetters);
    //Extention of Part8:
    countRemaining(capturedInput);

    //Extention of Part6:
    displayGuesses();

    //Extention of Part7:
    wordInProgress(guessedLetters);
  }
};


// Part6: Display the guessed letters
const displayGuesses = function () {
  guess.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guess.append(li);
    // console.log(guess);
  }
};


// Part7: Update the word in progress
const wordInProgress = function (guessedLetters) {
  const upperWord = word.toUpperCase();
  const wordArray = upperWord.split("")
  const displayWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter.toUpperCase())) {
      displayWord.push(letter);
    } else {
      displayWord.push("?");
    }
  }
  // console.log(displayWord)
  progress.innerText = displayWord.join("");
  
  //Extention of Part9
  winner();
};


// Part8: Count the guesses remaining
const countRemaining = function (capturedInput) {
  // remainingCount = 8;
  const upperWord = word.toUpperCase();
  // console.log(upperWord);
  // console.log(capturedInput);
  if (!upperWord.includes(capturedInput)) {
    remainingCount -= 1;
    remainingSpan.innerText = `${remainingCount} guesses`;
    responseMessage.innerText = `That is incorrect.  ${capturedInput} is not in the word.`;
  } else {
    responseMessage.innerText = `That is correct!!!  ${capturedInput} is in the word!!!`;
  }
  if (remainingCount === 1) {
    remainingSpan.innerText = `${remainingCount} guess`;
  } else {
    remainingSpan.innerText = `${remainingCount} guesses`;
  }
  if (remainingCount === 0) {
    responseMessage.innerHTML = `Sorry, the game is over.  The word is <span class="highlight">${upperWord}.</span>`;
    
    //Extention of Part11
    startOverOption();
  }
};


// Part9: Let the player know that they won!
const winner = function () {
  const upperWord = word.toUpperCase();
  if (upperWord === progress.innerText) {
    responseMessage.innerHTML = `<span class="highlight">${upperWord} is the word!  You must have psychic powers!!!</span>`;
    responseMessage.classList.add("win");

    //Extention of Part11
    startOverOption();
  }
};


// Part11: Give the player the option to start over and play again
const startOverOption = function () {
  guessButton.classList.add("hide");
  playAgainButton.classList.remove("hide");
  guess.classList.add("hide");
  remaining.classList.add("hide");
};


// Part12: Add a click event to the play again button
playAgainButton.addEventListener("click", function (e) {
  e.preventDefault();
  guessButton.classList.remove("hide");
  playAgainButton.classList.add("hide");
  guessedLetters = [];
  guess.innerHTML = "";
  guess.classList.remove("hide");
  remainingCount = 8;
  remainingSpan.innerText = `${remainingCount} guesses`;
  remaining.classList.remove("hide");
  responseMessage.classList.remove("win");
  responseMessage.innerText = "";
  //Extention of Part10
  getNewWord();
});