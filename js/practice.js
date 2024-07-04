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

let word = "malinda";
let storedGuesses = [];
let remainingGuesses = 8;


// Part10: Randomly pick a word from a list of 823 words 
// API Address: https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt
const randomWord = async function () {
  const getData = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const getWords = await getData.text();
  const arrayOfWords = getWords.split("\n");
  const randomeIndex = Math.floor(Math.random() * arrayOfWords.length);
  
  word = arrayOfWords[randomeIndex];
  placeholders(word);
};
randomWord();

// Part2: Add placeholders for each letter in the word
const placeholders = function (word) {
	const placeholdersArray = [];

	for (const letter of word) {
		placeholdersArray.push("#");
	}
  progress.innerText =  placeholdersArray.join("");
};
placeholders(word);


// Part3: Capture the input when the guess button is clicked
guessButton.addEventListener("click", function (e) {
	e.preventDefault();
	const capturedValue = input.value;
	//Extention of Part4
	const goodGuess = validGuess(capturedValue);
	if (goodGuess) {
		//Extention of Part5
		updatePage(capturedValue);
	}
	input.value = "";
});


// Part4: Validate the player's guess
const validGuess = function (capturedValue) {
	const acceptedLetters = /[a-zA-Z]/;
	
	if (capturedValue.length === 0) {
		responseMessage.innerText = "Please enter a value first!";
	} else if (capturedValue.length > 1) {
		responseMessage.innerText = "Only enter one value at a time!";
	} else if (!capturedValue.match(acceptedLetters)) {
		responseMessage.innerText = "Only enter values from A to Z!";
	} else {
		return capturedValue;
	}
};


// Part5: What happens when the player makes a valid guess?
const updatePage = function (capturedValue) {
  const upperGuess = capturedValue.toUpperCase();
	
	if (storedGuesses.includes(upperGuess)) {
		responseMessage.innerText = "You have already made that guess!";
	} else {
		storedGuesses.push(upperGuess);
	}
	

//Extenton of Part8
countRemainingGuesses(capturedValue);

//Extenton of Part6
diplayGuesses();

//Extenton of Part7
wordInProgress(storedGuesses);
};


// Part6: Display the guessed letters
const diplayGuesses = function () {
  guess.innerHTML = "";
	for (const letter of storedGuesses) {
		const li = document.createElement("li");
		li.innerText = letter;
		guess.append(li);
	}
};


// Part7: Update the word in progress
const wordInProgress = function (storedGuesses) {
  const updatedWord = [];
  const upperWord = word.toUpperCase();
  
  for (const letter of upperWord) {
    if (storedGuesses.includes(letter)) {
      updatedWord.push(letter);
    } else {
      updatedWord.push("#");
    }
    progress.innerText = updatedWord.join("");
  }
  winner();
};


// Part8: Count the guesses remaining
const countRemainingGuesses = function (capturedValue) {
  const upperGuess = capturedValue.toUpperCase();
  const upperWord= word.toUpperCase();
  const wordArray = upperWord.split("");

  if (!wordArray.includes(upperGuess)) {
    remainingGuesses -= 1;
    responseMessage.innerText = `Incorrect! The letter ${upperGuess} is not in the word.`;
  } else {
    responseMessage.innerText = `Correct!!! The letter ${upperGuess} is in the word!!!`;
  }

  if (remainingGuesses === 1) {
    remainingSpan.innerText = `${remainingGuesses} guess`;
  } else if (remainingGuesses === 0) {
    responseMessage.innerHTML = `The Game is Over!!!  The secret word is <span class="highlight">${upperWord}</span>.`
    //Extention of Part11
    startOverOption();
  } else {
      remainingSpan.innerText = `${remainingGuesses} guesses`;
    }
  };


// Part9: Let the player know that they won!
const winner = function () {
  const upperWord = word.toUpperCase();

  if (upperWord === progress.innerText) {
    responseMessage.innerHTML = `<p class="highlight">You Win!!! ${upperWord} is the secret word!</p>`;
    responseMessage.classList.add("win");
    //Extention of Part11
    startOverOption()
  }
};


// Part11: Give the player the option to start over and play again
const startOverOption = function () {
  guessButton.classList.add("hide");
  guess.classList.add("hide");
  remaining.classList.add("hide");
  playAgainButton.classList.remove("hide");
};


// Part12: Add a click event to the play again button
playAgainButton.addEventListener("click", function (e) {
  e.preventDefault();
  guessButton.classList.remove("hide");
  guess.innerHTML = ""
  storedGuesses = [];
  guess.classList.remove("hide");
  remainingGuesses = 8;
  remainingSpan.innerText = `${remainingGuesses} guesses`;
  remaining.classList.remove("hide");
  playAgainButton.classList.add("hide");
  responseMessage.classList.remove("win");
  responseMessage.innerText = "";
  //Extention of Part10
  randomWord();
});
  



