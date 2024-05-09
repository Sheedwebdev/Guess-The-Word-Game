// Part1: Create all global variables for the page
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

//Number of reps completed = 9

// Part2: Add placeholders for each letter in the word
const update = function (word) { // step12: Create a function expression using the word to guessed as the parameter
  const updatedLetters = []; // step13: Declare a variable and assign an empty array to it
  for (const letter of word) { // step14: Loop through each letter in the array word 
    console.log(letter);  // step15: Check whether each element (letter) was looped through 
    updatedLetters.push("●"); // step16: Push a "●" into the empty array after each loop/iteration (Since there are 8 letters in magnolio, there should be 8 "●")
  }
  progress.innerText = updatedLetters.join(""); // step17: Set the inner text of the word in progress paragraph to array of "●" all  joined together like a string
};
update(word); // step18: Call or execute the placeholders function using the word as the argument

//Number of reps completed = 9

// Part3: Apply an event listener to the guess button
guessButton.addEventListener("click", function (e) { // step19: Apply an event listener to the guess button
  e.preventDefault(); // step20: Prevent the form default action of reloading the page when the user clicks the button
  const caputuredInput = input.value; // step21: Declare a variable to capture the input value
  console.log(caputuredInput); // step22: Check to see if the input value is being captured
  responseMessage.innerText = ""; // step23: Clear the previous response message everytime the player clicks the guess button
  
  //Number of reps completed = 9

  //Extension of Part4
  const goodGuess = inputValidation(capturedInput); // step33: Declare a variable that make sure the player's input is valid by calling the inputValidation funciton from part4 
  console.log(goodGuess);  // step34: Check to see if inputValidation() function is working as expected
  
  //Extension of Part5
  if (goodGuess) { // step41: Write a conditonal block that determines what to do if input is valid
    makeGuess(capturedInput); // step42: If input is valid, than call the makeGuess function from part5 to make sure the player does not guess the same value more than once
  }
  input.value = ""; // step43: Clear the value each time its been captured 
});

// Part4: Validate the player's input
const inputValidation = function (capturedInput) { // step24: Define a function expression that validates the captured input value
  const acceptedLetter = /[a-zA-Z]/; // step25: Declare a variable that defines the range of accepted letters
  if (capturedInput.length === 0) { // step26: Write a conditional statement if the player doesn't enter any letter 
    responseMessage.innerText = "Please enter a letter."; // step27: Change the text of the response paragraph directing the player to enter a letter
  } else if (capturedInput.length > 1) { // step28: Write a conditional statement if the player guesses more than one letter
    responseMessage.innerText = "Please enter a single letter."; // step29: Change the text of the response paragraph directing the player to only guess one letter
  } else if (!capturedInput.match(acceptedLetter)) { // step30: Write a conditional statement if the player guesses a character outside of the accepted letter range
    responseMessage.innerText = "Please enter a letter from A to Z."; // step31: Change the text of the response paragraph directing the player to only enter a letters from A to Z
  } else { // step32: Return the input if all the above conditions never occur
    return capturedInput;
  }
};

// Part5: Create a function that executes all desired actions once the player makes a guess
const makeGuess = function (capturedInput) { // step35: Define a function expression 
  capturedInput = capturedInput.toUpperCase();  // step36: Change all valid input values to upper case 
  if (guessedLetters.includes(capturedInput)) {  // step37: Write a condition statement visa vis whether the array already includes the captured value 
    responseMessage.innerText = "You already guessed that letter, silly. Try again." // step38: Change the text of the response paragraph informing the player they have already guessed that letter
  } else { // step39: Push the captured input to the guessedLetters array
    guessedLetters.push(capturedInput);
    console.log(guessedLetters);  // step40: When this funciton is ran, check whether valid inputs are pushed to the guessedLetters array  
    //reps completed: 9

    // Extention of Part9
    //step79: Execute the countRemining function 

    // Extention of Part6
    displayedLetters(); //step50:  Display the guessed letters by calling the displayedLetters() function from Part6
    

    // Extention of Part7
    //step62: Update the players guess 
  }
};

// Part6: Display the guessed letters
const displayedLetters = function () {  // step44: Create a function expression for displaying the player's guesses 
  guess.innerHTML = "";  // step45: Clear the unordered list where the player's guess will appear 
  for (const letter of guessedLetters) {  // step46: Loop through the elements(letters) of the guessedLetters array 
    const li = document.createElement("li");  // step47: Create a li element for each letter that is looped through 
    li.innerText = letter;  // step48:  Change the text of the li element to the player's guess
    guess.append(li); // step49: Add the li element to the unordered list element
  }
};

// Number of reps completed: 9




    


 






   
 
