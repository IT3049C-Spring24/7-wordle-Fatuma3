function checkWordPositions(guess, word) {
    const feedback = [];
    guess.split('').forEach((letter, index) => {
        if (letter === word[index]) {
            console.log(`Letter ${letter} is in the correct position`);
            feedback.push('correct');
        } else if (word.includes(letter)) {
            console.log(`Letter ${letter} is in the word, but not in the correct position`);
            feedback.push('misplaced');
        } else {
            console.log(`Letter ${letter} is not in the word`);
            feedback.push('wrong');
        }
    });
    return feedback;
}