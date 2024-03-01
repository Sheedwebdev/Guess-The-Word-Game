// Part1: Create global variables for selecting all targeted elements on the page
const guess = document.querySelector(".guessed-letters"); // declare a variable to target the unorder list where the players guess will appear
const guessButton = document.querySelector(".guess");
const input = document.querySelector(".letter");
const progress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const response = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

// Part2: Create a function to add placeholders for each letter
const update = function (word) {
  const updatedLetters = [];
  for (const letter of word) {
    console.log(letter);
    updatedLetters.push("●");
  }
  progress.innerText = updatedLetters.join("");
};

update(word);

// Part3: Apply an event listener to the guess button
guessButton.addEventListener("click", function (e)  {
  e.preventDefault();
  const inputCapture = input.value;
  console.log(inputCapture);
  input.value = "";
});