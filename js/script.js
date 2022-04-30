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
const guessStatus = document.querySelector(".message");
//hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again hide");

//test word for building (ltr pull frm api)
const word = "magnolia";
//global const array 4 all letters guessed
const alreadyGuessed = [];

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
    //Empty message paragraph
    guessStatus.innerText = "";
    const playerGuess = playerInput.value;
    //Validate Input in the Button Event Handler
    const goodPlayerGuess = validateInput(playerGuess);
    if (goodPlayerGuess) {
        //got letter for pattern
        makeGuess(goodPlayerGuess);
        // console.log(playerGuess);
        playerGuess.value = ""; //empty the value of the input
    }
});

//Function to Check Player’s Input
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-z]/;
    if (input.length === 0) {
        //is the input empty
        guessStatus.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        //is the input is more than 1 letter
        guessStatus.innerText = "Please enter 1 letter at a time.";
    } else if (!input.match(acceptedLetter)) {
        //check if the entered character doesn't match the regular expression pattern(not a letter)
        guessStatus.innerText = "Please enter a letter from A-Z";
    } else {
        //the input is a letter/character w/i pattern(good guess/valid)
        return input;
    }
};

//Function to Capture Input
const makeGuess = function (playerGuess) {
    playerGuess = playerGuess.toUpperCase();
    if (alreadyGuessed.includes(playerGuess)) {
        guessStatus.innerText = `You have already guessed ${alreadyGuessed}; try another letter`;
    } else {
        alreadyGuessed.push(playerGuess);
        console.log(alreadyGuessed);
        showAlreadyGuessed();
        updateWordInProgress(alreadyGuessed);
    }
};

//Function to Show the Guessed Letters
const showAlreadyGuessed = function () {
    ul.innerHTML = ""; //empty ul of players guessed lttrs
    for (let letter of alreadyGuessed) {
        //create new li 4 lttrs w/i alreadyGuessed array
        const li = document.createElement("li");
        li.innerText = letter;
        ul.append(li);
    }
};

//Function to Update the Word in Progress
const updateWordInProgress = function (alreadyGuessed) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    // console.log(wordArray);
    const replacePlaceholderLetters = [];

    for (const letter of wordArray) {
        if(alreadyGuessed.includes(letter)) {
            replacePlaceholderLetters.push(letter.toUpperCase());
        } else {
            replacePlaceholderLetters.push("●");
        }
    }
    // console.log(replacePlaceholderLetters);
    wordInProgress.innerText = replacePlaceholderLetters.join("");
    ifPlayerWin();
}; 

//Function to Check If the Player Won
const ifPlayerWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        guessStatus.classList.add("win");
        guessStatus.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
}; 