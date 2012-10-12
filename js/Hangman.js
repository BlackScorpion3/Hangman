define(['tpl!templates/hangman.tpl', 'Letter'], function(template, Letter) {
    var Hangman = function(node, word) {
        this._node = node;
        this._word = word;
        this._letters = [];
        this._hung = 0;
        this._death = 8;
        this._dead = false;
        this._saved = false;

        this.create = function(continueGame) {
            var hangman = this;
            var request = api('hangman', 'create', {'continueGame': continueGame});
            request.done(function(data) {
                if (data.error) {
                    error(data.error);
                }
                else {
                    if (data.letters) {
                        for(var i = 0; i < data.letters.length; i++) {
                            var letter = new Letter(data.letters[i]);
                            letter.validate(hangman);
                        }
                    }
                    hangman._word.setLength(data.wordLength);
                    hangman.render();
                    hangman._word.render();
                }
            });
        };
        
        this.give = function(letter) {
            if (this.canTakeLetter(letter)) {
                this._letters.push(letter);
                if (letter.isAccepted()) {
                    this._word.addLetter(letter);
                    this._word.render();
                    if (this._word.isComplete()) {
                        this._saved = true;
                    }
                }
                else {
                    this.hang();
                }
            }
            else {
                error('The Hangman has already received this letter...');
            }
        };
        
        this.hang = function() {
            if (!this._saved) {
                if (!this._dead) {
                    this._hung++;
                    $('#hangmanStage div[data-hang=' + this._hung + ']').fadeIn(1000);
                    if (this._hung == this._death) {
                        this._dead = true;
                        error('You did NOT save the person from being hung!');
                    }
                }
                else {
                    error('The person has already been hung!');
                }
            }
            else {
                error('You have already saved the person from being hung!');
            }
        };
        
        this.canTakeLetter = function(letter) {
            for(var i = 0; i < this._letters.length; i++) {
                if (this._letters[i].getLetter() == letter.getLetter()) {
                    return false;
                }
            }
            return true;
        };
        
        this.reset = function() {
            var hangman = this;
            var request = api('hangman', 'reset');
            request.done(function(data) {
                if (data.error) {
                    error(data.error);
                }
                else {
                    hangman._word.reset(data.wordLength);
                    hangman._letters = [];
                    hangman._hung = 0;
                    hangman._death = 8;
                    hangman._dead = false;
                    hangman._saved = false;
                    $('#hangmanStage div').fadeOut(100);
                    hangman.render();
                    error('reset');
                }
            });
        };

        this.render = function() {
            this._node.innerHTML = template({'letters': this._letters});
        };
    };
    return Hangman;
});
