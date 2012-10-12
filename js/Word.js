define(['tpl!templates/word.tpl'], function(template) {
    var Word = function(node) {
        this._node = node;
        this._length = 0;
        this._letters = [];
        this._complete = false;

        this.addLetter = function(letter) {
            var index = letter.getIndex();
            for(var i = 0; i < index.length; i++) {
                this._letters[index[i]] = letter.getLetter().toUpperCase();
            }
            this.checkComplete();
        };
        
        this.setLength = function(length) {
            this._length = length;
            for(var i = 0; i < length; i++) {
                this._letters[i] = '';
            }
        };
        
        this.isComplete = function() {
            return this._complete;
        };
        
        this.checkComplete = function() {
            var complete = true;
            for(var i = 0; i < this._letters.length; i++) {
                if (this._letters[i] == '') {
                    complete = false;
                }
            }
            
            if (complete) {
                this._complete = complete;
                error('You saved the person from being hung!');
            }
        };
        
        this.reset = function(wordLength) {
            this._letters = [];
            this._complete = false;
            this.setLength(wordLength);
            this.render();
        };

        this.render = function() {
            this._node.innerHTML = template({
                'length': this._length,
                'letters': this._letters
            });
        };
    };
    return Word;
});
