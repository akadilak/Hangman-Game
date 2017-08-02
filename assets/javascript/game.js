// VARIABLES
// =================================================================================
var wins = 0;
var placeholderArray = [];
var prevPlaceholderArray = [];
var wordPlaceholder = [];
var lettersGuessed = [];
var word = [];
var wordPlaceholderString = "";
var userInput = "";
var correctGuessCount = 0;
var guessesLeft = 20;

// Object of Harry Potter Hangman words.
var HarryPotterWords = {
	word1: ["V", "O", "L", "D", "A", "M", "O", "R", "T"],
	word2: ["A", "Z", "K", "A", "B", "A", "N"],
	word3: ["D", "U", "M", "B", "L", "E", "D", "O", "R", "E"],
	word4: ["M", "I", "S", "C", "H", "I", "E", "F", "M", "A", "N", "A", "G", "E", "D"],
	word5: ["W", "A", "N", "D"],
	word6: ["H", "A", "R", "R", "Y", "P", "O", "T", "T", "E", "R"],
	word7: ["H", "E", "R", "M", "I", "O", "N", "E"],
	word8: ["E", "X", "P", "E", "L", "L", "I", "A", "R", "M", "U", "S"],
	word9: ["R", "O", "N"],
	word10: ["M", "A", "G", "I", "C"],
};

// Array of words from object
var wordArray = [HarryPotterWords.word1, HarryPotterWords.word2, HarryPotterWords.word3, HarryPotterWords.word4, HarryPotterWords.word5, HarryPotterWords.word6, HarryPotterWords.word7, HarryPotterWords.word8, HarryPotterWords.word9, HarryPotterWords.word10];

// Initialize game
createWord(wordArray);

// Initialize onkeyup
document.onkeyup = function(event) {
	console.log('This is the key entered', event.key);
	var keyPress;

	if (typeof event != 'undefined') {
		keyPress = event.keyCode;

		// Convert user input key to upper case string.
		userInput = String.fromCharCode(keyPress).toUpperCase();
		console.log(userInput + " should match the key entered");

		// Track user guesses over time.
		trackLetterGuesses(userInput);

		// Pause audio.
		pauseAudio();

		// Build hangman word based on new user input.
		buildWord(userInput);
	}

	else if (e) {
		keyPress = e.which;
	}
	return false;
};


//Create array 
function createWord(wordArray) {
	word = wordArray[Math.floor(Math.random()*wordArray.length)];
	console.log(word);

	//Create placeholder
	createWordPlaceholder(word);
	return word;
};

function createWordPlaceholder(word) {	
	var wordPlaceholder = [];

	// Fill array with underscores.
	for (i = 0; i < word.length; i++) {
		wordPlaceholder.push("_");
	}

	// Convert word placeholder array to string 
	wordPlaceholderString = wordPlaceholder.join(" ");

	// Display word placeholder 
	document.getElementById('word-placeholder').textContent = wordPlaceholderString;
	return wordPlaceholder;
};

// Keep track of user guesses.
function trackLetterGuesses(userInput) {

	//Check if letter already guessed, letters not repeatedly tracked
	 
	for (i = 0; i < lettersGuessed.length; i++) {
		if (userInput == lettersGuessed[i]) {
			return;
		}
	}

	// Push letter guessed.
	lettersGuessed.push(userInput);
	console.log("LettersGuessed array item: " + lettersGuessed[0]);
	
	// Convert letters guessed array to string 
	var lettersGuessedString = lettersGuessed.join(", ");
	document.getElementById('letters-guessed').innerHTML = lettersGuessedString;

	// Each guess reduces number of guesses left. 
	guessesLeft--;

	// How many guesses are left
	document.getElementById('guess-count').innerHTML = guessesLeft;
	console.log('Guesses left' + guessesLeft);


	// Game restarts after guesses are exceeded
	if (guessesLeft == 0) {
		restartGame();
	}

	return lettersGuessedString;
};

// Builds hangman word
function buildWord(userInput) {

	// Initialize placeholder array to underscore placeholder.
	if (prevPlaceholderArray.length == 0) {
		placeholderArray = createWordPlaceholder(word);

	// See letters and underscores.
	} else {
		placeholderArray = prevPlaceholderArray;
	}

	// Replace underscore with matching letter.
	for (var i = 0; i < word.length; i++) {
	  console.log('Word is ' + word);
	  if (userInput == word[i]) {
	  	console.log(userInput + " is in word at " + i);
	  	//
	  	placeholderArray[i] = userInput;
	  }
	}

	prevPlaceholderArray = placeholderArray;

	// Convert placeholder array to string 
	placeholder = placeholderArray.join(" ");
	document.getElementById('word-placeholder').innerHTML = placeholder;

	console.log("Placeholder Array length is " + placeholderArray.length);
	console.log("Placeholder split is " + placeholder.split(","));
	console.log("Word join is " + word.join(" "));
	
	// User wins when placeholder matches word.
	if (placeholder.split(',') == word.join(" ")) {
		console.log("Woot");
		wins++;
		playAudio();
		document.getElementById('win-count').innerHTML = wins;
		restartGame();
	}
};

function playAudio() { 
	// Play some music when you win.
	var vid = document.getElementById("music"); 
    vid.play(); 
}

function pauseAudio() { 
	// Ability to pause music 
	var vid = document.getElementById("music"); 
    vid.pause(); 
}

// Restart game
function restartGame(wordPlaceholder) {
	
	// Add new word.
	createWord(wordArray);

	//Empty user input and placeholder values.
    userInput = "";
	prevPlaceholderArray = [];
	placeholderArray = [];

	// Reset remaining guesses.
	guessesLeft = 20;

	// Reset guess count.
	correctGuessCount = 0;
	document.getElementById('guess-count').innerHTML = guessesLeft;

	// Reset list of letters guessed.
	lettersGuessed = [];
	document.getElementById('letters-guessed').innerHTML = lettersGuessed;
};
