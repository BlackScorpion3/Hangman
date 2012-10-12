define(['Hangman', 'Letter', 'Word'], function(Hangman, Letter, Word) {
    var giveLetterToHangmanNode = document.getElementById('giveLetterToHangman');
    var resetHangmanNode = document.getElementById('resetHangman');
    var hangmanWordNode = document.getElementById('hangmanWord');
    var hangmanContainerNode = document.getElementById('hangmanContainer');

    // create a hangman stage and word object
    var word = new Word(hangmanWordNode);
    var hangman = new Hangman(hangmanContainerNode, word);
    
    // populate the objects with current game or create a new game
    hangman.create(true);

    giveLetterToHangmanNode.addEventListener('click', function(e) {
        // give your letter to the hangman
        if (isValidLetter($('#letter').val())) {
            var letter = new Letter($('#letter').val());
            letter.validate(hangman);
        }
        else {
            error('The hangman could not understand your letter and killed the messenger...');
        }
        
        $('#letter').attr('value', '');
    });
    
    resetHangmanNode.addEventListener('click', function(e) {
       hangman.reset(); 
    });
});
