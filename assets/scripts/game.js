

function checkWordpostions(userGuess, Wordguess) {
    Wordguess.split('').forEach((letter, index) => {
        if (letter === userGuess[index]) {
            console.log(`letter ${letter} is in the correct position`);
            return `correct`;
        }
        else if (Wordguess.includes(letter)) {
            console.log(`letter ${letter} is in the word, but not in the correct position`);
            return `misplaced`;
        }
        else {
            console.log(`letter ${letter} is not in the word`)
            return `wrong`;
        }
    });
}
