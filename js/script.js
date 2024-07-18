//Reps Completed: 7

//Part1: Global Variables
const responseMessage = document.querySelector(".message");
const progress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const guess = document.querySelector(".guessed-letters");
const input = document.querySelector(".letter");
const guessButton = document.querySelector(".guess");
const playAgainButton = document.querySelector(".play-again");
let word = "magnolia";
let storedGuesses = [];
let remainingCount = 8;


// Part10: Randomly pick a word from a list of 823 words 
// API Address: https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt
const randomWord = async function () {
  const getData = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const getWords = await getData.text();
  const arrayOfWords = getWords.split("\n");
  const randomIndex = Math.floor(Math.random() * arrayOfWords.length);
  word = arrayOfWords[randomIndex];
  placeholders(word);
  console.log(word);
};
randomWord();

// Part2: Add placeholders for each letter in the word
const placeholders = function (word) {
  const placeholdersArray = [];
  for (const letter of word) {
    placeholdersArray.push("*");
  }
  progress.innerText = placeholdersArray.join("");
};
placeholders(word);


// Part3: Capture the input value when the guess button is clicked
guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const capturedValue = input.value;
  const goodGuess = guessValidation(capturedValue);
  if (goodGuess) {
    renderUpdates(capturedValue);
    input.value = "";
  }
});


// Part4: Validate the player's guess
const guessValidation = function (capturedValue) {
  const acceptedGuesses = /[a-zA-Z]/;
  if (capturedValue.length === 0) {
    responseMessage.innerText = "Please enter a value first!";
  } else if (capturedValue.length > 1) {
    responseMessage.innerText = "Please only enter one value at a time!";
  } else if (!capturedValue.match(acceptedGuesses)) {
    responseMessage.innerText = "Please only enter letters from A to Z!";
  } else {
    return capturedValue;
  }
};


// Part5: What happens when the player makes a valid guess?
const renderUpdates = function (capturedValue) {
  if (storedGuesses.includes(capturedValue)) {
    responseMessage.innerText = "You have already made that guess! Try a different one!";
  } else {
    storedGuesses.push(capturedValue.toUpperCase());
  }
  //Update 1. Word In Progress area 2. Remaining Count area 3. Displayed letters area
  renderRemainingGuesses(capturedValue);
  renderGuesses();
  renderWordInProgess(storedGuesses);
};


// Part6: Display the guessed letters
const renderGuesses = function () {
  guess.innerHTML = "";
  for (const letter of storedGuesses) {
    const li = document.createElement("li");
    li.innerText = letter.toUpperCase();
    guess.append(li);
  }
};


// Part7: Update the word in progress
const renderWordInProgess = function (storedGuesses) {
  const wordInProgress = [];
  const upperWord = word.toUpperCase();
  const wordArray = upperWord.split("");
  for (const letter of wordArray) {
    if (storedGuesses.includes(letter)) {
      wordInProgress.push(letter);
    } else {
      wordInProgress.push("*");
    }
  }
  progress.innerText = wordInProgress.join("");
  winner();
};


// Part8: Count the guesses remaining
const renderRemainingGuesses = function (capturedValue) {
  const upperGuess = capturedValue.toUpperCase();
  const upperWord = word.toUpperCase();
  const wordArray = upperWord.split("");
  if (!wordArray.includes(upperGuess)) {
    responseMessage.innerText = `Incorrect! The letter ${upperGuess} is not in the word.`;
    remainingCount -= 1;
    remainingSpan.innerText = `${remainingCount} guesses`;
  } else {
    responseMessage.innerText = `The letter ${upperGuess} is correct!!! You are on fire!!!`;
  }
  if (remainingCount === 1) {
    remainingSpan.innerText = `${remainingCount} guess`;
  } else if (remainingCount === 0) {
    responseMessage.innerHTML = `Sorry, game over! The secret word is <span class="highlight">${upperWord}</span>.`;
    startOverOption();
  } else {
    remainingSpan.innerText = `${remainingCount} guesses`;
  }
};


// Part9: Let the player know that they won!
const winner = function () {
  const upperWord = word.toUpperCase();
  if (progress.innerText === upperWord) {
    responseMessage.innerHTML = `<p class="highlight">You Win!!! Your lexicon is on fire!!!</p>`;
    responseMessage.classList.add("win");
    startOverOption();
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
  storedGuesses = [];
  guess.classList.remove("hide");
  remainingCount = 8;
  remainingSpan.innerText = `${remainingCount} guesses`;
  remaining.classList.remove("hide");
  responseMessage.innerText = "";
  responseMessage.classList.remove("win");
  randomWord();
});