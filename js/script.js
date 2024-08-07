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
let storedGuesses = [];
let countRemaining = 8;


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
    countRemaining -= 1;
    remainingSpan.innerText = `${countRemaining} guesses`;
  } else {
    responseMessage.innerText = `Correct guess!!! You are on fire!!!`;
  } if (countRemaining === 1) {
    remainingSpan.innerText = `${countRemaining} guess`;
  } else if (countRemaining === 0) {
    responseMessage.innerHTML = `The game is over! The secret word is <span class="highlight">${upperWord}</span>`;
    startOverOption();
  } else {
    remainingSpan.innerText = `${countRemaining} guesses`;
  }
};


// Part9: Let the player know that they won!
const winner = function () {
  const upperWord = word.toUpperCase();
  if (progress.innerText === upperWord) {
    responseMessage.innerHTML =  `<p class="highlight">You Win!!! Your lexicon is lit!!!</p>`;
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
  const upperWord = word.toUpperCase();
  if (progress.innerText === upperWord) {
    countRemaining = 8;
    countRemaining -= 1;
  } else if (countRemaining === 0) {
    countRemaining = 8;
    countRemaining += 1;
  }
  playAgainButton.classList.add("hide");
  guessButton.classList.remove("hide");
  guess.innerHTML = "";
  guess.classList.remove("hide");
  remainingSpan.innerText = `${countRemaining} guesses`
  remaining.classList.remove("hide");
  storedGuesses = [];
  responseMessage.innerText = "";
  responseMessage.classList.remove("win");
  randomWord();
});