//Reps Completed: 3

//Part1: Global Variables
const responseMessage = document.querySelector(".message");
const progress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const guess = document.querySelector(".guessed-letters");
const input = document.querySelector(".letter");
const guessButton = document.querySelector(".guess");
const playAgainButton = document.querySelector(".play-again");

let word = "Mobley";
let guessedLetters = [];
let remainingGuesses = 8;


// Part10: Randomly pick a word from a list of 823 words 
// API Address: https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt
const getNewWord = async function () {
  const getData = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const getWords = await getData.text();
  const wordsArray = getWords.split("\n");
  const randomIndex = Math.floor(Math.random() * wordsArray.length);
  word = wordsArray[randomIndex].trim();
  console.log(word);
  //Extention of Part2
  placeholders(word);
};
getNewWord();

// Part2: Add placeholders for each letter in the word
const placeholders = function (word) {
  const placeholdersArray = [];
  for (const letter of word) {
	  placeholdersArray.push("$");
	}
  progress.innerText = placeholdersArray.join("");
}; 



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
		guessedLetters.push(capturedValue.toUpperCase());
		// console.log(guessedLetters);
	}
  //Extention of Part8
	countRemaining(capturedValue);

	//Extention of Part6
	displayGuesses();

	//Extention of Part7
	updatedWord(guessedLetters);

	// console.log(guessedLetters);
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
	// console.log(wordArray);

	for (const letter of wordArray) {
		if (guessedLetters.includes(letter)) {
			displayedWord.push(letter);
		} else {
			displayedWord.push("$");
		}
	}
	progress.innerText = displayedWord.join("");
	// console.log(guessedLetters);

  //Extention of Part9
	winner();
};  


// Part8: Count the guesses remaining
const countRemaining = function (capturedValue) { 
	const upperWord = word.toUpperCase();
  const wordArray = upperWord.split("");
  const guess = capturedValue.toUpperCase();

	if (!wordArray.includes(guess)) {
		remainingGuesses -= 1;
		responseMessage.innerText = `Incorrect. The letter ${guess} is not in the word.`;
	} else {
		responseMessage.innerText = `Great Job!!! The letter ${guess} is in the word.`;
	}

	if (remainingGuesses === 1) {
		remainingSpan.innerText = `${remainingGuesses} guess`
	} else if (remainingGuesses === 0) {
		responseMessage.innerHTML = `Sorry, the game is over.  The word is <span class="highlight">${upperWord}</span>`;
	  //Extention of Part11
		startOverOption();
	} else {
		remainingSpan.innerText = `${remainingGuesses} guesses`;
	}
};


// Part9: Let the player know that they won!
const winner = function () {
	const upperWord = word.toUpperCase();
	// console.log(upperWord);
	// console.log(progress);

	if (upperWord === progress.innerText) {
		responseMessage.classList.add("win");
		responseMessage.innerHTML = `<p class="highlight">You win!!! The word is ${upperWord}! You are on fire!!!</p>`;
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
};


// Part12: Add a click event to the play again button
playAgainButton.addEventListener("click", function () {
	playAgainButton.classList.add("hide");
	guessButton.classList.remove("hide");
	guess.innerHTML = "";
	guessedLetters = [];
	guess.classList.remove("hide");
	console.log(guess);
	remainingGuesses = 8;
	remainingSpan.innerText = `${remainingGuesses} guesses`;
	remaining.classList.remove("hide");
	responseMessage.classList.remove("win");
	responseMessage.innerText = "";
	//Extention of Part10
  getNewWord()
});