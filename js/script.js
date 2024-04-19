// Part1: Create global variables (include varibles for selecting all targeted elements on the page)
const guess = document.querySelector(".guessed-letters"); // step1: Declare a variable to target the unordered list where the players guess will appear
const guessButton = document.querySelector(".guess"); // step2: Declare a variable to target the guess button
const input = document.querySelector(".letter"); // step3: Declare a variable to target the input element
const progress = document.querySelector(".word-in-progress"); // step4: Declare a variable to target the word in progress
const remaining = document.querySelector(".remaining"); // step5: Declare a variable to target the paragraph that displays guesses remaining
const remainingSpan = document.querySelector(".remaining span"); // step6: Declare a variable to target the actual number of remaining guesses
const responseMessage = document.querySelector(".message"); // step7: Declare a variable to target the paragraph that will display the response message to the user's guess
const playAgainButton = document.querySelector(".play-again"); // step8: Declare a variable to target the hidden play again button
let word = "magnolia"; // step9: Declare a variable and assign it the inital word to be guessed
let guessedLetters = []; // step10: Declare a variable for an empty array that will store a player's guesses
let remainingGuesses = 8;  // step11: Declare a variable for the initial remaining guesses

// Part10: Create an asynchronous function to randomly pick from a list of 800 words 
const getWord = async function () { //step80: Write an asynchronous function 
  const retrieve = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"); //step81: Fetch the data from this address: https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt 
  const words = await retrieve.text(); //step82: Parse the text data into js data
  console.log(words); //step83: Log out the parse data to see what it looks like
  const wordArray = words.split("\n"); //step84: Use the fetched data to create an array of words 
  const randomWord = Math.floor(Math.random() * wordArray.length); //step85: Grab a random word from the array of words
  word = wordArray[randomWord].trim(); //step86:  Reassign the random word to the previously declared word variable (Make sure to eliminate space around the word!)
  update(word); //step87: Execute the placeholders function from Part2
};
getWord(); //step88: Execute the getWord() function



// Part2: Create a function to add placeholders for each letter
const update = function (word) { // step12: Create a function expression using the word to guessed as the parameter
  const updatedLetters = []; // step13: Declare a variable and assign an empty array to it
  for (const letter of word) { // step14: Loop through each letter in the array word 
    console.log(letter);  // step15: Check whether each element (letter) was looped through 
    updatedLetters.push("●"); // step16: Push a "●" into the empty array after each loop/iteration (Since there are 8 letters in magnolio, there should be 8 "●")
  }
  progress.innerText = updatedLetters.join(""); // step17: Set the inner text of the word in progress paragraph to array of "●" all  joined together like a string
};
update(word); // step18: Call or execute the placeholders function using the word as the argument

// Part3: Apply an event listener to the guess button
guessButton.addEventListener("click", function (e)  { // step19: Apply an event listener to the guess button
  e.preventDefault(); // step20: Prevent the form default action of reloading the page when the user clicks the button
  const capturedInput = input.value; // step21: Declare a variable to capture the input value
  // console.log(capturedInput); // step22: Check to see if the input value is being captured
  responseMessage.innerText = ""; // step23: Clear the previous response message everytime the player clicks the guess button

  const goodGuess = inputValidation(capturedInput); // step33: Declare a variable that make sure the player's input is valid by calling the inputValidation funciton from part4 
  console.log(goodGuess);  // step34: Check to see if inputValidation() function is working as expected
  
  if (goodGuess) { // step41: Write a conditonal block that determines what to do if input is valid
    makeGuess(capturedInput); // step42: If input is valid, than call the makeGuess function from part5 to make sure the player does not guess the same value more than once
  }
  input.value = ""; // step43: Clear the value each time its been captured
});

// Part4: Create a function to check the player's input
const inputValidation = function (input) { // step24: Define a function expression that validates the captured input value
  const acceptedLetter = /[a-zA-Z]/; // step25: Declare a variable that defines the range of accepted letters
  if (input.length === 0) { // step26: Write a conditional statement if the player doesn't enter any letter 
    responseMessage.innerText = "Please enter a letter."; // step27: Change the text of the response paragraph directing the player to enter a letter
  } else if (input.length > 1) { // step28: Write a conditional statement if the player guesses more than one letter
    responseMessage.innerText = "Please enter a single letter."; // step29: Change the text of the response paragraph directing the player to only guess one letter
  } else if (!input.match(acceptedLetter)) { // step30: Write a conditional statement if the player guesses a character outside of the accepted letter range
    responseMessage.innerText = "Please enter a letter from A to Z."; // step31: Change the text of the response paragraph directing the player to only enter a letters from A to Z
  } else { // step32: Return the input if all the above conditions never occur
    return input;
  }
};

// Part5: Create a function that captures a valid input value and displays a message if that value has already been captured
const makeGuess = function (capturedInput) { // step35: Define a function expression 
  capturedInput = capturedInput.toUpperCase();  // step36: Change all valid input values to upper case 
  if (guessedLetters.includes(capturedInput)) {  // step37: Write a condition statement visa vis whether the array already includes the captured value 
    responseMessage.innerText = "You already guessed that letter, silly. Try again." // step38: Change the text of the response paragraph informing the player they have already guessed that letter
  } else { // step39: Push the captured input to the guessedLetters array
    guessedLetters.push(capturedInput);
    // console.log(guessedLetters);  // step40: When this funciton is ran, check whether valid inputs are pushed to the guessedLetters array  
    
    countRemaining(capturedInput); //step79: Execute the countRemining function 
    
    displayedLetters(); //step50:  Display the guessed letters by calling the displayedLetters() function from Part6
    
    updatedWord(guessedLetters); //step62: Update the players guess 
  }
};

// Part6: Create a function that displays the guessed letters
const displayedLetters = function () {  // step44: Create a function expression for displaying the player's guesses 
  guess.innerHTML = "";  // step45: Clear the unordered list where the player's guess will appear 
  for (const letter of guessedLetters) {  // step46: Loop through the elements(letters) of the guessedLetters array 
    const li = document.createElement("li");  // step47: Create a li element for each letter that is looped through 
    li.innerText = letter;  // step48:  Change the text of the li element to the player's guess
    guess.append(li); // step49: Add the li element to the unordered list element
  }
};

// Part7: Create a function that updates the word in progress
const updatedWord = function (guessedLetters) { //step51:  Create a function expression that displays the word in progress 
  const wordUpper = word.toUpperCase(); //step52: Change the word to be guessed to upper case
  const wordArray = wordUpper.split(""); //step53: Split the characters of the word to be guessed into an array
  console.log(wordArray); //step54: Check if the wordArray contains any letters from the guessedLetters array.
  const displayWord = []; //step55: Create an empty array to push the correct letters to
  for (const letter of wordArray) { //step56: Loop through each element of the array that represents the word to be guessed
    if (guessedLetters.includes(letter)) { //step57: Check whether the player's guess matches a letter in the word to be guessed  
      displayWord.push(letter.toUpperCase()); //step58:  If it does match, then push it to the displayWord array
    } else {
      displayWord.push("●"); //step59: If it doesn't match then push a "●" to the displayWord array
    }
  }
  console.log(displayWord); //step60: Check to see the player's correct guesses are shown in the displayWord array
  progress.innerText = displayWord.join(""); //step61: Change the text of the paragraph that shows the word in progress
  
  won(); //step67: Let the player know whether they have won
};


// Part9: Create a function to count guesses remaining
const countRemaining = function (capturedInput) {  //step68: Create a function for counting the remaining guesses
  const upperWord = word.toUpperCase();//step69: Change the word to be guessed to uppercase
  if (!upperWord.includes(capturedInput)) { //step70: Write a conditional statement stating if the word does not include the player's guess
    responseMessage.innerText = `The letter ${capturedInput} is not in the word.`; //step71: Change the text of the response paragraph telling the player their guess is not in the word
    remainingGuesses -= 1; //step72: Subtract one from the remaining guesses
  } else { //step73: If the above conditions never occur, then change the text of the response paragraph letting the player know that their guess is correct
    responseMessage.innerText = `Great guess! The letter ${capturedInput} is correct!`;
  }
  if (remainingGuesses === 0) { //step74: Write a conditional statement stating if there are no more remaining guesses
    responseMessage.innerHTML = `The game is over.  The word is <span class="highlight">${word}</span>.  Try to play the game again!`; //step75: Let the player know the game is over and to try to play again
    
    startOver(); //step95: Execute the startOver function when the player looses

  } else if (remainingGuesses === 1) { //step76: Write a condtitional statement stating if there was only one guess remaining
    remainingSpan.innerText = `${remainingGuesses} guess`; //step77: In the remaining span, let the player know they have one guess left
  } else { //step78: If none of the conditions occur, in the remaining span, let the player know how many guesses they have left
    remainingSpan.innerText = `${remainingGuesses} guesses`;
  }
};


// Part8: Create a function that determines if the player has won!
const won = function () { //step63: Create a function expression that checks if the player has won
  if (word.toUpperCase() === progress.innerText) { //step64: Check if the word to be guessed is the same as the word in progress
    responseMessage.classList.add("win"); //step65: If it is the same, then add the win class to the paragraph that shows the response message
    responseMessage.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`; //step66: Also, change the content of the response message paragraph to a congratulatios message 
    
    startOver(); //step94: Execute the startOver() function when the player wins
  }
};

// Part11: Create a function to hide and show elements
const startOver = function () { //step89: Declare a variable for a function
  guessButton.classList.add("hide"); //step90: Hide the guess button
  remaining.classList.add("hide"); //step91: Hide the number of guesses remaining
  guess.classList.add("hide"); //step92: Hide the player's guesses
  playAgainButton.classList.remove("hide"); //step93: Display the play again button
};

// Part12: Add a click event to the play again button
playAgainButton.addEventListener("click", function (e)  { //step96: Apply an event listener to the play again button
  e.preventDefault(); //step97: Prevent the form default action of reloading the page when the user clicks the button
  responseMessage.classList.remove("win"); //step98:  Make the win class disappear from the response message
  responseMessage.innerText = ""; //step99: Clear the response message 
  remainingGuesses = 8; //step101: Reassign the remaining guesses back to the initial amount
  guessedLetters = []; //step102: Reassign the guessed letters variable back to an empty array
  remainingSpan.innerText = `${remainingGuesses} guesses`; //step103: Let the player know how many guesses that have remaining
  guessButton.classList.remove("hide"); //step104: Make the guess button reappear again
  remaining.classList.remove("hide"); //step105: Make the number of guesses remaining reappear again
  guess.classList.remove("hide"); //step106: Allow the player's guesses to appear again
  playAgainButton.classList.add("hide"); //step107: Make the play again button disappear
  getWord(); //step108: Execute the getWord() function from Part10 to fetch a new word
});
 






