// Part1: Create global variables (include varibles for selecting all targeted elements on the page)
const guess = document.querySelector(".guessed-letters"); // step1: Declare a variable to target the unordered list where the players guess will appear
const guessButton = document.querySelector(".guess"); // step2: Declare a variable to target the guess button
const input = document.querySelector(".letter"); // step3: Declare a variable to target the input element
const progress = document.querySelector(".word-in-progress"); // step4: Declare a variable to target the word in progress
const remaining = document.querySelector(".remaining"); // step5: Declare a variable to target the paragraph that displays guesses remaining
const remainingSpan = document.querySelector(".remaining span"); // step6: Declare a variable to target the actual number of remaining guesses
const responseMessage = document.querySelector(".message"); // step7: Declare a variable to target the paragraph that will display the response message to the user's guess
const playAgainButton = document.querySelector(".play-again"); // step8: Declare a variable to target the hidden play again button

const word = "magnolia"; // step8: Declare a variable to define the word to be guessed
const guessedLetters = [];

// Part2: Create a function to add placeholders for each letter
const update = function (word) { // step9: Create a function expression using the word to guessed as the parameter
  const updatedLetters = []; // step10: Declare a variable and assign an empty array to it
  for (const letter of word) { // step11: Loop through each letter in the array word 
    console.log(letter);  // step12: Check whether each element (letter) was looped through 
    updatedLetters.push("●"); // step13: Push a "●" into the empty array after each loop/iteration (Since there are 8 letters in magnolio, there should be 8 "●")
  }
  progress.innerText = updatedLetters.join(""); // step14: Set the inner text of the word in progress paragraph to array of "●" all  joined together like a string
};

update(word); // step15: Call or execute the placeholders function using the word as the argument

// Part3: Apply an event listener to the guess button
guessButton.addEventListener("click", function (e)  { // step16: Apply an event listener to the guess button
  e.preventDefault(); // step17: Prevent the form default action of reloading the page when the user clicks the button
  responseMessage.innerText = ""; //Clear the previous response message everytime the player clicks the guess button
  const capturedInput = input.value; // step18: Declare a variable to capture the input value
  // console.log(capturedInput); // step19: Check to see if the input value is being captured
  const goodGuess = inputValidation(capturedInput); // step23: Declare a variable that make sure the player's input is valid by calling the inputValidation funciton from part4 
  if (goodGuess) { // step28: Write a conditonal block that determines what to do if input is valid
    makeGuess(capturedInput); // step29: If input is valid, than call the makeGuess function from part5 to make sure the player does not guess the same value more than once
  }
  input.value = ""; // step30: Clear the value each time its been captured
});

// Part4: Create a function to check the player's input
const inputValidation = function (input) { // step20: Define a funtion expression that validates the captured input value
  const acceptedLetter = /[a-zA-Z]/; // step21: Declare a variable that defines the range of accepted letters
  if (input.length === 0) { // step22: Write a conditional block for all three invalid player input values 
    responseMessage.innerText = "Please enter a letter.";
  } else if (input.length > 1) {
    responseMessage.innerText = "Please enter a single letter.";
  } else if (!input.match(acceptedLetter)) {
    responseMessage.innerText = "Please enter a letter from A to Z.";
  } else {
    return input;
  }
};

// Part5: Create a function that captures a valid input value and displays a message if that value has already been captured
const makeGuess = function (capturedInput) { // step24: Define a function expression 
  capturedInput = capturedInput.toUpperCase();  // step25: Change all valid input values to upper case 
  if (guessedLetters.includes(capturedInput)) {  // step26: Write a condition block visa vis whether the array already includes the captured value 
    responseMessage.innerText = "You already guessed that letter, silly. Try again."
  } else {
    guessedLetters.push(capturedInput);
    // console.log(guessedLetters);  // step27: When this funciton is ran, check whether valid inputs are pushed to guessedLetters array
    displayedLetters();
    updatedWord(guessedLetters);
  }
};

// Part6: Create a function that displays the guessed letters
const displayedLetters = function () {
  guess.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guess.append(li);
  }
};

// Part7: Create a function that updates the word in progress
const updatedWord = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const displayWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      displayWord.push(letter.toUpperCase());
    } else {
      displayWord.push("●");
    }
  }
  // console.log(displayWord);
  progress.innerText = displayWord.join("");
  won();
};

// Part8: Create a function that determines if the player has won!
const won = function () {
  if (word.toUpperCase() === progress.innerText) {
    responseMessage.classList.add("win");
    responseMessage.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p`;
  }
};

