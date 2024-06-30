//Reps Completed: 3

//Part1: Global Variables
const responseMessage = document.querySelector(".message");
const progress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const guess = document.querySelector(".guessed-letters");
const input = document.querySelector(".letter");
const guessButton = document.querySelector(".guess");
const playAgainButton = document.querySelector(".play-agin");
let word = "Mobley";
// console.log(word);
let guessedLetters = [];
let remainingGuesses = 8;


// Part10: Randomly pick a word from a list of 823 words 
// API Address: https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"


// Part2: Add placeholders for each letter in the word
const placeholders = function (word) {
  const placeholdersArray = [];
  for (const letter of word) {
	  placeholdersArray.push("$");
	}
  progress.innerText = placeholdersArray.join("");
}; 
placeholders(word);


// Part3: Capture the input when the guess button is clicked
guessButton.addEventListener("click", function (e) {
	e.preventDefault();
	const capturedValue = input.value;
	// console.log(capturedValue);
	//Extention of Part4
	const goodGuess = guessValidation(capturedValue);
  //Extention of Part5
	if (goodGuess) {
		makeValidGuess(capturedValue);
	}
    input.value = "";
	});


// Part4: Validate the player's guess
const guessValidation = function (capturedValue) {
	const acceptedLetters = /[a-zA-Z]/;
	if (capturedValue.length === 0) {
		responseMessage.innerText = "Please enter a value.";
	} else if (capturedValue.length > 1) {
		responseMessage.innerText = "Wait just one minute! Don't go crazy!  One guess at a time!";
	} else if (!capturedValue.match(acceptedLetters)) {
		responseMessage.innerText = "Please be logical!  Only values from A to Z!";
	} else {
			return capturedValue;
		}
	};



// Part5: What happens when the player makes a valid guess?
const makeValidGuess = function (capturedValue) {
	
	if (guessedLetters.includes(capturedValue)) {
		responseMessage.innerText = "Look at your displayed guesses. It shows you already made that guess.";
	} else {
		guessedLetters.push(capturedValue);
		// console.log(guessedLetters);
	}
	//Extention of Part6
	displayGuesses();

	//Extention of Part7
	updatedWord(guessedLetters);
};


// Part6: Display the guessed letters
const displayGuesses = function () {
	guess.innerHTML = "";
	for (const letter of guessedLetters) {
		const li = document.createElement("li");
		li.innerText = letter;
		guess.append(li);
	}
	// console.log(guess);
};


// Part7: Update the word in progress
const updatedWord = function (guessedLetters) {
  const displayedWord = [];
	const upperWord = word.toUpperCase();
	const wordArray = upperWord.split("");
	for (const letter of wordArray) {
		if (guessedLetters.includes(letter)) {
			displayedWord.push(letter.toUpperCase());
		} else {
			displayedWord.push("$");
		}
	}
	progress.innerText = displayedWord.join("");
	console.log(displayedWord);
};  


// Part8: Count the guesses remaining


// Part9: Let the player know that they won!



// Part11: Give the player the option to start over and play again



// Part12: Add a click event to the play again button
