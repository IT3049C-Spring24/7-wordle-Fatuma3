
// add box to grid
function addBoxtoGrid(row,col){
    const grid = document.getElementById('wordle-grid');
    const box = document.createElement('div');
    box.id = `${row}-${col}`;
    box.classList.add('letter');
    grid.appendChild(box);
   
}

setupGrid();

// setup grid
function setupGrid(){
    for (let row = 0; row < 6; row++){
        for (let col = 0; col < 5; col++){
            addBoxtoGrid(row, col);
        }
    }
}   


// confirming is letter
function isLetter(letter) {
    return letter.length === 1 && letter.match(/[a-z]/i);
}


// add letter to box
function addLetterToBox(row, col, letter){
    const cell = document.getElementById(`${row}-${col}`);
    cell.innerText = letter;
}


const gameConfig = {
    rows: 6,
    cols: 5,
};

// Game State 
const gameState = {
    currentAttempt: 0,
    currentPosition: 0,
    currentGuess: '',
    currentWord: '',
};

async function getWord() {
    const response = await fetch('https://it3049c-hangman.fly.dev/api/word');
    const randomwords = await response.json();
    const word = randomwords.word;
    console.log(word);
    return word;
}


async function iswordValid(word) {
    const confirming = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).
    then((confirming) => confirming.json());
    valid = Array.isArray(confirming) && confirming.length > 0;
    console.log(valid);
    return valid;
}

function updateAttemptGrid(){
    gameState.currentAttempt = 0;
    gameState.currentPosition = 0;
    gameState.currentGuess = '';
    gameState.currentWord = '';

    // Clear the grid
    for (let row = 0; row < gameConfig.rows; row++) {
        for (let col = 0; col < gameConfig.cols; col++) {
            const cell = document.getElementById(`${row}-${col}`);
            cell.innerText = '';
            cell.classList.remove('correct', 'misplaced', 'wrong');
        }
    }
    
}





//
// validate user entry
document.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        if (gameState.currentAttempt === gameConfig.rows) {
            console.log(`Try again! You have used all your attempts!`);
            updateAttemptGrid();
            return;
        }

        if (gameState.currentGuess.length !== gameConfig.cols) {
            console.log('Guess a 5-letter word!');
            return;
        }

        if (!gameState.currentWord) {
            gameState.currentWord = await getWord();
            console.log('New Word:', gameState.currentWord);
        }

        if (await iswordValid(gameState.currentGuess)) {
            console.log('Valid word!');

            const feedback = checkWordPositions(gameState.currentGuess, gameState.currentWord);

            feedback.forEach((result, index) => {
                const cell = document.getElementById(`${gameState.currentAttempt}-${index}`);
                cell.classList.add(result);
            });

            const correctLetters = feedback.filter(result => result === 'correct').length;

            if (correctLetters === gameConfig.cols) {
                console.log('You guessed the word!');
                alert(`You guessed the word! The word was ${gameState.currentWord}`);
                updateAttemptGrid();
                return;
            } else {
                console.log('Try again!');
                
            }
           
        } else {
            console.log('Guess a valid word!');
        }

        gameState.currentAttempt++;
        gameState.currentGuess = '';
        gameState.currentPosition = 0;
    }

    if (event.key === 'Backspace') {
        if (gameState.currentPosition > 0) {
            gameState.currentPosition--;
            gameState.currentGuess = gameState.currentGuess.slice(0, -1);
            addLetterToBox(gameState.currentAttempt, gameState.currentPosition, '');
        }
    }

    if (isLetter(event.key) && gameState.currentPosition < gameConfig.cols) {
        addLetterToBox(gameState.currentAttempt, gameState.currentPosition, event.key);
        gameState.currentGuess += event.key;
        gameState.currentPosition++;
    }
});
