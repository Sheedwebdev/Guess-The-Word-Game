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
	if (goodGuess) {
		//Extention of Part5
		renderUpdates(capturedValue);
	}
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
const renderUpdates = function (capturedValue) {
	const upperGuess = capturedValue.toUpperCase();
	if (storedGuesses.includes(upperGuess)) {
		responseMessage.innerText = "You have already made that guess. Try another guess!"
	} else {
		storedGuesses.push(upperGuess)
		renderRemainingGuesses(upperGuess);
		renderGuesses();
		renderWordInProgress(storedGuesses);
	}
};


// Part6: Display the guessed letters
const renderGuesses = function () {
	guess.innerHTML = "";
	for (const letter of storedGuesses) {
		const li = document.createElement("li");
		li.innerText = letter;
		guess.append(li);
	}
};


// Part7: Update the word in progress
const renderWordInProgress = function (storedGuesses) {
	const upperSecret = secret.toUpperCase();
	const updatedWord = [];
	for (const letter of upperSecret) {
		if (storedGuesses.includes(letter)) {
			updatedWord.push(letter);
	  } else {
			updatedWord.push("?");
		}
	};
	progress.innerText = updatedWord.join("");
	winner();
}

// Part8: Count the guesses remaining
const renderRemainingGuesses = function (upperGuess) {
	const upperSecret = secret.toUpperCase();
	const secretArray = upperSecret.split("");
	if (!secretArray.includes(upperGuess)) {
			responseMessage.innerText = `Incorrect. The letter ${upperGuess} is not in the word.`;
			countRemaining -= 1;
			remainingSpan.innerText = `${countRemaining} guesses`;
		} else {
			responseMessage.innerText = `Correct!!! The letter ${upperGuess} is in the word!`;
		}
	if (countRemaining === 1) {
		remainingSpan.innerText = `${countRemaining} guess`;
	} else if (countRemaining === 0) {
		responseMessage.innerHTML = `Game over. The secret word is <span class="highlight">${upperSecret}</span>`;
	} else {
		remainingSpan.innerText = `${countRemaining} guesses`;
	}
};


// Part9: Let the player know that they won!
const winner = function () {
	const upperSecret = secret.toUpperCase();
	if (upperSecret === progress.innerText) {
		responseMessage.innerHTML = `<p class="highlight">You Win!!! You are on fire!!!</p>`;
		responseMessage.classList.add("win");
	}
}


// Part11: Give the player the option to start over and play again



// Part12: Add a click event to the play again button

