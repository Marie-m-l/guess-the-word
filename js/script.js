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
let word = "magnolia";
//global const array 4 all letters guessed
const alreadyGuessed = [];
//Global Variable for the Number of Guesses
let remainingGuesses = 8;

//Async Function for random word api
const getWord = async function () {
    const resp = await fetch(
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
        );
    const words = await resp.text();
    // console.log(words);
    const wordArray = words.split("\n");
    console.log(wordArray);
    const randomIndexWords = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndexWords].trim();
    placeholder(word);
};

getWord();

//display circle symbol as placeholder for word letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    } 
    wordInProgress.innerText = placeholderLetters.join("");
};

getWord();

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

//Function to Capture player Input
const makeGuess = function (playerGuess) {
    playerGuess = playerGuess.toUpperCase();
    if (alreadyGuessed.includes(playerGuess)) {
        guessStatus.innerText = `You have already guessed ${playerGuess}; try another letter`;
    } else {
        alreadyGuessed.push(playerGuess);
        console.log(alreadyGuessed);
        showAlreadyGuessed();
        countRemainingGuesses(playerGuess);
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

// Function to Count Guesses Remaining and Display Result
const countRemainingGuesses = function (playerGuess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(playerGuess)) {
        //bad player guess - 1 guess
        guessStatus.innerText = `${playerGuess} isn't in this word. Guess again 😉`;
        remainingGuesses -= 1;
    } else {
        guessStatus.innerText = `Good Guess! You have ${playerGuess} in your word! What is your next guess?`;
    }

    //check if there are 0 guesses left(loss)/ 1 guess left
    if (remainingGuesses === 0) {
        guessStatus.innerHTML = `The word is <span class="highlight>${word}</span> <br> Better luck next time!. `;
        spanRemainingGuess.innerText = `no more guesses`;
    } else if (remainingGuesses === 1) {
        spanRemainingGuess.innerText = `${remainingGuesses} guess`;
    } else {
        spanRemainingGuess. innerText = `${remainingGuesses} guesses`;
    }
}; 

//Function to Check If the Player Won
const ifPlayerWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        guessStatus.classList.add("win");
        guessStatus.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
}; 