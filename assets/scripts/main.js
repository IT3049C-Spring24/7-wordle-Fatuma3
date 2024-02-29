const word = `https://it3049c-hangman.fly.dev/api/word`;

console.log(word);  

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
    console.log(cell);
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
};


async function iswordValid(word) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).
    then((response) => response.json());
    console.log(Array.isArray(response) && response.length > 0);
    return Array.isArray(response) && response.length > 0;
    console.log(response);
}

function updateAttemptGrid(){
    const result = checkWordpostions(gameState.currentWord, gameConfig.word);    
    result.forEach((result, index) => {
        const cell = document.getElementById(`${gameState.currentAttempt}-{index}`);
        cell.classList.add(result);
    });
    
}


// validate user entry
document.addEventListener('keydown', async (event) => {
   
    if (event.key === 'Enter') {
       
        if (gameState.currentAttempt === gameConfig.cols) {
            console.log('You have reached the maximum number of attempts');
            return;
        }

        //check guessed 5 letters
        if (gameState.currentPosition !== gameConfig.cols - 1) {
            console.log('You guessed less than 5!');
        }

        
        //check is the word valid
        if (! await (iswordValid(gameState.currentAttempt))) {
            console.log('You got the correct word');

        } else {
            console.log('Try again!');
            
        }

        gameState.currentAttempt++; 
        gameState.currentPosition = 0;
        gameState.currentGuess = '';
    
    }

    
    if (event.key === 'Backspace') {
        addLetterToBox( gameState.currentAttempt ,gameState.currentPosition,''); 
        if (gameState.currentPosition >= 0) {
            gameState.currentPosition;
        }
    }   
    
    if (isLetter(event.key)) {
        addLetterToBox( gameState.currentAttempt ,gameState.currentPosition,event.key); 
            console.log(gameState.currentPosition);
            gameState.currentGuess += event.key;

        if (gameState.currentPosition < gameConfig.cols -1) {
            gameState.currentPosition++;
        }

    }
        


});