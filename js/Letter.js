define(['tpl!templates/letter.tpl'], function(template) {
    var Letter = function(letter) {
        this._index = false;
        this._letter = letter;
        this._accepted = 'Pending...';

        this.validate = function(hangman) {
            var request = api('hangman', 'validateLetter', {'letter': this._letter});
            var letter = this;
            request.done(function(data) {
                if (data.error) {
                    error(data.error);
                }
                else {
                    letter.setAccepted(data.accepted);
                    if (data.accepted === true) {
                        letter.setIndex(data.index);
                    }
                    hangman.give(letter);
                    hangman.render();
                }
            });
            
            return request;
        };
        
        this.setAccepted = function(accepted) {
            this._accepted = accepted;
        };
        
        this.setIndex = function(index) {
            this._index = index;
        };

        this.getIndex = function() {
            return this._index;
        };

        this.getLetter = function() {
            return this._letter;
        };
        
        this.isAccepted = function() {
            return this._accepted;
        };

        this.render = function() {
            return template({
                'valid': (this._accepted == true) ? 'accepted' : 'declined',
                'letter': this._letter,
                'accepted': this._accepted
            });
        };
    };
    return Letter;
});
