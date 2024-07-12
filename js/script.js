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


const randomSecretWord = async function () {
  const getData = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const getWords = await getData.text();
  const arrayOfWords = getWords.split("\n")
  const randomIndex = Math.floor(Math.random()*arrayOfWords.length);
  secretWord = arrayOfWords[randomIndex];
  placeholders(secretWord);
};
randomSecretWord();


const placeholders = function (secretWord) {
  const placeholderArray = [];
  for (const letter of secretWord) {
    placeholderArray.push("*");
  }
  progress.innerText = placeholderArray.join("");
};
placeholders(secretWord);


guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const capturedGuess = input.value;
  const goodGuess = validatedGuess(capturedGuess);
  if (goodGuess) {
    renderUpdates(capturedGuess);
  }
  input.value = "";
});  


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


const renderUpdates = function (capturedGuess) {
	const upperGuess = capturedGuess.toUpperCase();
  if (guessedLetters.includes(upperGuess)) {
    responseMessage.innerText = "You already made that guess!";
  } else {
    guessedLetters.push(upperGuess);
    renderRemainingGuesses(capturedGuess);
    renderGuesses();
    renderWordInProgress(guessedLetters);
  }
};


const renderGuesses = function() {
  guess.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guess.append(li);
  }
};


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
  winner();
};


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
    responseMessage.innerHTML = `You ran out of guesses!  The word is <span class="highlight">${upperWord}</span>.`;
    startOverOption();
  } else {
    remainingSpan.innerText = `${remainingGuesses} guesses`;
  }
};


const winner = function () {
  const upperWord = secretWord.toUpperCase();
  if (upperWord === progress.innerText) {
    responseMessage.innerHTML = `<p class="highlight">You Win!!! You are on fire!!!</p>`;
    responseMessage.classList.add("win");
    startOverOption();
  }
};


const startOverOption = function () {
  playAgainButton.classList.remove("hide");
  guessButton.classList.add("hide");
  guess.classList.add("hide");
  remaining.classList.add("hide");
};


playAgainButton.addEventListener("click", function(e) {
  e.preventDefault();
  playAgainButton.classList.add("hide");
  guessButton.classList.remove("hide");
  guess.innerHTML = "";
  guessedLetters = [];
  guess.classList.remove("hide");
  remainingGuesses = 8;
  remainingSpan.innerText = `${remainingGuesses} guesses`;
  remaining.classList.remove("hide");
  responseMessage.innerText = "";
  responseMessage.classList.remove("win");
  randomSecretWord();
});
