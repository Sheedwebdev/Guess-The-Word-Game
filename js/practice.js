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


// Part10: Randomly pick from a word from a list of 800 words 
// API Address: https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
const randomWord = async function () {
  const retriveData = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await retriveData.text();
  // console.log(retriveData);
  // console.log(words);
  const arrayOfWords = words.split("\n");
  // console.log(arrayOfWords);
  const randomIndex = Math.floor(Math.random() * arrayOfWords.length);
  // console.log(randomIndex);
  word = arrayOfWords[randomIndex].trim();
  console.log(word);

  //Extention of Part2
  placeholders(word);
};
randomWord();

// Part2: Add placeholders for each letter in the word
const placeholders = function (word) {
  const placeholdersArray = [];
  for (const letter of word) {
    // console.log(letter);
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

    //Extention of Part8 (Must be called before Part6 and Part7 since they are dependent on this function)
    remainingGuesses(capturedInput);

    //Extention of Part6
    displayGuesses();

    //Extention of Part7
    updatedProgress(guessedLetters);

    
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


// Part8: Count the guesses remaining
const remainingGuesses = function (capturedInput) {
  const upperWord = word.toUpperCase();
  const upperGuess = capturedInput.toUpperCase();
  // console.log(upperWord);
  // console.log(capturedInput);
  // console.log(upperGuess)
  if (!upperWord.includes(upperGuess)) {
    responseMessage.innerText = `The letter ${upperGuess} is not in the word.`;
    countRemaining -= 1;
  } else {
    responseMessage.innerText = `Great Job!!! The letter ${upperGuess} is in the word!!!`;
  }
  if (countRemaining === 0) {
    responseMessage.innerHTML = `The game is over! The word is <span class="highlight">${upperWord}</span>.`;
    // Extention of Part11
    startOverOption();
  } else if (countRemaining === 1) {
    remainingSpan.innerText = `${countRemaining} guess`;
  } else {
    remainingSpan.innerText = `${countRemaining} guesses`;
  }
};



// Part9: Let the player know that they won!
const winner = function () {
  const upperWord = word.toUpperCase();
  if (word.toUpperCase() === progress.innerText) {
    responseMessage.classList.add("win");
    responseMessage.innerHTML = `<p class="highlight">${upperWord} is the correct word!!! Impressive lexicon you have!!!</p>`;
    // console.log(responseMessage);
     //Extention of Part11
  startOverOption();
  }
};





// Part11: Give the player the option to start over and play again
const startOverOption = function () {
  playAgainButton.classList.remove("hide");
  guessButton.classList.add("hide");
  guess.classList.add("hide");
  remaining.classList.add("hide");
  // console.log(startOverOption);
};


// Part12: Add a click event to the play again button
playAgainButton.addEventListener("click", function (e) {
  e.preventDefault();
  playAgainButton.classList.add("hide");
  guessButton.classList.remove("hide");
  remaining.classList.remove("hide")
  responseMessage.classList.remove("win");
  remainingSpan.innerText = `${countRemaining} guesses`;
  responseMessage.innerText = "";
  guess.innerHTML = "";
  guessedLetters = [];
  countRemaining = 8;
  randomWord();
});