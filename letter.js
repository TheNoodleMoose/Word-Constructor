let Letter = function(letter) {
  this.letter = letter;
  this.guessed = false;

  this.guessedCorrect = function(value) {
    if (this.letter.toLowerCase() === value) {
      this.guessed = true;
      this.toString();
    }
  };

  this.toString = function() {
    if (this.guessed) {
      return this.letter;
    } else {
      return "_";
    }
  };
};

module.exports = Letter;
