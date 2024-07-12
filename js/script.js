//Reps Completed: 6

//Part1: Global Variables
const responseMessage = document.querySelector(".message");
const progress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const guess = document.querySelector(".guessed-letters");
const input = document.querySelector(".letter");
const guessButton = document.querySelector(".guess");
const playAgainButton = document.querySelector(".play-again");
let secret = "viola";
let storedGuesses = [];
let countRemaining = 8;


// Part10: Randomly pick a word from a list of 823 words 
// API Address: https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt


// Part2: Add placeholders for each letter in the word
const placeholder = function (secret) {
	const placeholdersArray = [];
	for (const letter of secret) {
		placeholdersArray.push("?");
	}
	progress.innerText = placeholdersArray.join("");
};
placeholder(secret);


// Part3: Capture the input when the guess button is clicked
guessButton.addEventListener("click", function (e) {
	e.preventDefault();
	const capturedValue = input.value;
	//Extention of Part4
	const goodGuess = validGuess(capturedValue);
	input.value = "";
});


// Part4: Validate the player's guess
const validGuess = function (capturedValue) {
	const onlyLetters = /[a-zA-Z]/;
	if (capturedValue.length === 0) {
		responseMessage.innerText = "Please make a guess first!";
	} else if (capturedValue.length > 1) {
		responseMessage.innerText = "Please enter only one guess at a time!";
	} else if (!capturedValue.match(onlyLetters)) {
		responseMessage.innerText = "Please enter only letters from A to Z!";
	} else {
		return capturedValue;
	}
};


// Part5: What happens when the player makes a valid guess?

  


// Part6: Display the guessed letters



// Part7: Update the word in progress




// Part8: Count the guesses remaining

 

  


// Part9: Let the player know that they won!



// Part11: Give the player the option to start over and play again



// Part12: Add a click event to the play again button

