//global variables

//unordered list where the player’s guessed letters will appear
const ul = document.querySelector(".guessed-letters");
//button with the text “Guess!” in it
const guessButton = document.querySelector(".guess");
//text input where the player will guess a letter
const playerInput = document.querySelector(".letter");
//empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
//paragraph where the remaining guesses will display
const remainingGuess = document.querySelector(".remaining");
//span inside the paragraph where the remaining guesses will display
const spanRemainingGuess = document.querySelector(".remaining span");
//empty paragraph where messages will appear when the player guesses a letter
const guessedLetters = document.querySelector(".message");
//hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again hide");

//test word for building (ltr pull frm api)
const word = "magnolia";
//display circle symbol as placeholder for word letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    } 
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

//Add an Event Listener for the Button
guessButton.addEventListener('click' , function(e) {
    e.preventDefault();
    const playerGuess = playerInput.value;
    console.log(playerGuess);
    playerGuess.value = ""; //empty the value of the input
})