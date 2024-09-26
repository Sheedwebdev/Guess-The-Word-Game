//Part1: Global Variables
const responseMessage = document.querySelector(".message");
const responseMessageSpan = document.querySelector(".message span");
const progress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const guess = document.querySelector(".guessed-letters");
const input = document.querySelector(".letter");
const guessButton = document.querySelector(".guess");
const playAgainButton = document.querySelector(".play-again");
const lightMode = document.querySelector(".light-mode");
const darkMode = document.querySelector(".dark-mode");
const body = document.querySelector("body");

let word = "enahora";
let storedGuesses = [];
let countRemaining = 8;
let continuousCount = 8;


// Part10: Randomly pick a word from a list of 823 words 
// API Address: https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt
const randomWord = async function () {
  const getData = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const getWords = await getData.text();
  const arrayOfWords = getWords.split("\n");
  const randomIndex = Math.floor(Math.random() * arrayOfWords.length);
  word = arrayOfWords[randomIndex];
  console.log(word);
  placeholders(word);
};
randomWord();


// Part2: Add placeholders for each letter in the word
const placeholders = function (word) {
  const placeholdersArray = [];
  for (const letter of word) {
    placeholdersArray.push("?")
  }
  progress.innerText = placeholdersArray.join("");
};
placeholders(word);



// Part3: Capture the input value when the guess button is clicked
guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const capturedValue = input.value;
  const validGuess = guessValidation(capturedValue);
  if (validGuess) {
    showUpdates(capturedValue);
  }
  input.value = "";
});


// Part4: Validate the player's guess
const guessValidation = function (capturedValue) {
  
  const acceptedLetters = /[a-zA-Z]/;
  if (capturedValue.length === 0) {
    responseMessage.innerText = "Please enter a value first!";
  } else if (capturedValue.length > 1) {
    responseMessage.innerText = "Please only enter one value at a time!";
  } else if (!capturedValue.match(acceptedLetters)) {
    responseMessage.innerText = "Please only enter values from A to Z!";
  } else {
    return capturedValue;
  }
};


// Part5: What happens when the player makes a valid guess?
const showUpdates = function (capturedValue) {
  const upperGuess = capturedValue.toUpperCase();
  if (storedGuesses.includes(upperGuess)) {
    responseMessage.innerText = "You have already made that guess! Try something else!";
  } else {
    storedGuesses.push(upperGuess);
    // Show updates: Display the guesses, word in progress, new remaining count
    showRemainingGuesses(capturedValue);
    showGuesses();
    showWordInProgress(storedGuesses);
  }
};


// Part6: Display the guessed letters
const showGuesses = function () {
  guess.innerHTML = "";
  for (const letter of storedGuesses) {
    const li = document.createElement("li");
    li.innerText = letter;
    guess.append(li);
  }
};


// Part7: Update the word in progress
const showWordInProgress = function (storedGuesses) {
  const upperWord = word.toUpperCase();
  const wordInProgress = [];
  for (const letter of upperWord) {
    if (storedGuesses.includes(letter)) {
      wordInProgress.push(letter);
    } else {
      wordInProgress.push("?");
    }
  }
  progress.innerText = wordInProgress.join("");
  winner();
};


// Part8: Count the guesses remaining
const showRemainingGuesses = function (capturedValue) {
  const upperWord = word.toUpperCase();
  const upperGuess = capturedValue.toUpperCase();
  if(!upperWord.includes(upperGuess)) {
    responseMessage.innerText = `Incorrect guess! The letter ${upperGuess} is not in the word.`;
    // countRemaining -= 1;
    countRemaining--;
    remainingSpan.innerText = `${countRemaining} guesses`;
  } else {
    responseMessage.innerText = `Correct guess!!! You are on fire!!!`;
  } 

  if (countRemaining === 1) {
    remainingSpan.innerText = `${countRemaining} guess`;
  } else if (countRemaining === 0) {
    responseMessage.innerHTML = `The game is over! The secret word is <span>${upperWord}</span>. 
    <br>If you play again, we'll make it a little easier with more guesses to start with.`;
    if (darkMode.classList.contains("hide")) {
      responseMessageSpan.classList.add("highlight-dark");
    } else {
      responseMessageSpan.classList.add("highlight-light");
    }
    continuousCount++; 
    countRemaining = continuousCount;
    startOverOption();
  } else {
    remainingSpan.innerText = `${countRemaining} guesses`;
  }

  if (continuousCount > 12) {
    continuousCount = 12;
    countRemaining = continuousCount;
    responseMessage.innerHTML = `The game is over! The secret word is ${upperWord}. 
    <br>You've reached the lowest level of difficulty! Take your time!`;
  } 
};


// Part9: Let the player know that they won!
const winner = function () {
  const upperWord = word.toUpperCase();
  if (progress.innerText === upperWord) {
    responseMessage.innerHTML =  `<p>You Win!!! Your lexicon is lit!!!
    <br>If you play again, we'll make it a little harder with less guesses to start with.</p>`;
    if (darkMode.classList.contains("hide")) {
      responseMessage.classList.add("win-dark");
    } else {
      responseMessage.classList.add("win-light");
    }
    continuousCount--;
    countRemaining = continuousCount;
    startOverOption();
  } 
  
  if (continuousCount < 3) {
    continuousCount = 3;
    countRemaining = continuousCount;
    responseMessage.innerHTML =  `<p>You Win!!! Your lexicon is lit!!!<br>
    You've reached the highest level of difficulty! Great Job!</p>`;
  }
};


// Part11: Give the player the option to start over and play again
const startOverOption = function () {
  playAgainButton.classList.remove("hide");
  guessButton.classList.add("hide");
  guess.classList.add("hide");
  remaining.classList.add("hide");
};


// Part12: Add a click event to the play again button
playAgainButton.addEventListener("click", function () {
  playAgainButton.classList.add("hide");
  guessButton.classList.remove("hide");
  guess.innerHTML = "";
  guess.classList.remove("hide");
  remainingSpan.innerText = `${countRemaining} guesses`
  remaining.classList.remove("hide");
  storedGuesses = [];
  responseMessage.innerText = "";
  responseMessage.classList.remove("win-dark");
  responseMessage.classList.remove("win-light");
  // responseMessage.classList.remove("highlight-light");
  // responseMessage.classList.remove("highlight-dark");
  randomWord();
});


// Part13: Change the mode to light mode
lightMode.addEventListener("click", function (e) {
  e.preventDefault();
  lightMode.classList.add("hide");
  darkMode.classList.remove("hide");
  body.classList.add("light");
  progress.classList.add("word-in-progress-lightmode");
  guessButton.classList.add("guess-light");
  playAgainButton.classList.add("play-again-light");
  if (responseMessage.classList.contains("win-dark")) {
    responseMessage.classList.remove("win-dark");
    responseMessage.classList.add("win-light");
  }
});

// Part14: Change the mode back to dark mode
darkMode.addEventListener("click", function (e) {
  e.preventDefault();
  darkMode.classList.add("hide");
  lightMode.classList.remove("hide");
  guessButton.classList.remove("guess-light");
  playAgainButton.classList.remove("play-again-light");
  body.classList.remove("light");
  progress.classList.remove("word-in-progress-lightmode");
  if (responseMessage.classList.contains("win-light")) {
    responseMessage.classList.remove("win-light");
    responseMessage.classList.add("win-dark");
  }
});