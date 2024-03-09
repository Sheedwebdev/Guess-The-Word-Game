// Part1: Create global variables (include varibles for selecting all targeted elements on the page)
const guess = document.querySelector(".guessed-letters"); // step1: Declare a variable to target the unordered list where the players guess will appear
const guessButton = document.querySelector(".guess"); // step2: Declare a variable to target the guess button
const input = document.querySelector(".letter"); // step3: Declare a variable to target the input element
const progress = document.querySelector(".word-in-progress"); // step4: Declare a variable to target the word in progress
const remaining = document.querySelector(".remaining"); // step5: Declare a variable to target the paragraph that displays guesses remaining
const remainingSpan = document.querySelector(".remaining span"); // step6: Declare a variable to target the actual number of remaining guesses
const responseMessage = document.querySelector(".message"); // step7: Declare a variable to target the paragraph that will display the response message to the user's guess
const playAgainButton = document.querySelector(".play-again"); // step8: Declare a variable to target the hidden play again button

let word = "magnolia"; // step8: Declare a variable to define the word to be guessed
let guessedLetters = [];
let remainingGuesses = 8;

// Part10: Create an asynchronous function to randomly pick from a list of 800 words 
const getWord = async function () {
  const retrieve = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await retrieve.text();
  console.log(words);
  const wordArray = words.split("\n");
  const randomWord = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomWord].trim();
  update(word);
};

getWord();



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
    countRemaining(capturedInput);
    displayedLetters(); //step37:  Display the guessed letters by calling the displayedLetters() function from Part6
    updatedWord(guessedLetters); //step48: Update the players guess 
  }
};

// Part6: Create a function that displays the guessed letters
const displayedLetters = function () {  //step31: Create a function expression for displaying the player's guesses 
  guess.innerHTML = "";  //step32: Clear the unordered list where the player's guess will appear 
  for (const letter of guessedLetters) {  //step33: Loop through the elements(letters) of the guessedLetters array 
    const li = document.createElement("li");  //step34: Create a li element for each letter that is looped through 
    li.innerText = letter;  //step35:  Change the text of the li element to the player's guess
    guess.append(li); //step36: Add the li element to the unordered list element
  }
};

// Part7: Create a function that updates the word in progress
const updatedWord = function (guessedLetters) { //step38:  Create a function expression that displays the word in progress 
  const wordUpper = word.toUpperCase(); //step39: Change the word to be guessed to upper case
  const wordArray = wordUpper.split(""); //step40: Split the characters of word to be guessed into an array
  const displayWord = []; //step41: Create an empty array to push the correct letters to
  for (const letter of wordArray) { //step42: Loop through each element of the array that represents the word to be guessed
    if (guessedLetters.includes(letter)) { //step43: Check whether the player's guess matches a letter in the word to be guessed  
      displayWord.push(letter.toUpperCase()); //step44:  If it does match, then push it to the displayWord array
    } else {
      displayWord.push("●"); //step45: If it doesn't match then push a "●" to the displayWord array
    }
  }
  console.log(displayWord); //step46: Check to see the player's correct guesses are shown in the displayWord array
  progress.innerText = displayWord.join(""); //step47: Change the text of the paragraph that shows the word in progress
  won(); //step53: Let the player know whether they have won
};


// Part9: Create a function to count guesses remaining
const countRemaining = function (capturedInput) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(capturedInput)) {
    responseMessage.innerText = `The letter ${capturedInput} is not in the word.`;
    remainingGuesses -= 1;
  } else {
    responseMessage.innerText = `Great guess! The letter ${capturedInput} is correct!`;
  }

  if (remainingGuesses === 0) {
    responseMessage.innerHTML = `The game is over.  The word is <span class="highlight">${word}</span>.  Try to play the game again!`; 
    startOver();
  } else if (remainingGuesses === 1) {
    remainingSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingSpan.innerText = `${remainingGuesses} guesses`;
  }
};


// Part8: Create a function that determines if the player has won!
const won = function () { //step49: Create a function expression that checks if the player has won
  if (word.toUpperCase() === progress.innerText) { //step50: Check if the word to be guessed is the same as the word in progress
    responseMessage.classList.add("win"); //step51: If it is the same, then add the win class to the paragraph that shows the response message
    responseMessage.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`; //step52: Also, change the content of the response message paragraph to a congratulatios message 
    startOver();
  }
};

// Part11: Create a function to hide and show elements
const startOver = function () {
  guessButton.classList.add("hide");
  remaining.classList.add("hide");
  guess.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

// Part12: Add a click event to the play again button
playAgainButton.addEventListener("click", function (e)  { // step16: Apply an event listener to the guess button
  e.preventDefault(); // step17: Prevent the form default action of reloading the page when the user clicks the button
  responseMessage.classList.remove("win");
  responseMessage.innerText = ""; //Clear the previous response message everytime the player clicks the guess button
  guess.innerText = "";
  remainingGuesses = 8;
  guessedLetters = [];
  remainingSpan.innerText = `${remainingGuesses} guesses`; 
  guessButton.classList.remove("hide");
  remaining.classList.remove("hide");
  guess.classList.remove("hide");
  playAgainButton.classList.add("hide");
  getWord();
});
 






