const Letter = require("./letter");
const inquirer = require("inquirer");

let Word = function(word) {
  this.word = word;

  this.wordArray = this.word.split("");

  this.array = [];

  this.assignLetters = function() {
    for (let i of this.wordArray) {
      this.array.push(new Letter(i));
    }

    return this.array;
  };
  this.assignLetters();

  this.toString = function() {
    let string = "";
    for (let i in this.array) {
      let letterObj = this.array[i];

      string += letterObj + " ";
    }
    console.log(string);
  };

  this.guessChar = function(x) {
    let stage = 0;
    for (let i in this.array) {
      let LetterValue = this.array[i];

      LetterValue.guessedCorrect(x);
      if (LetterValue.letter.toLowerCase() == x) {
        stage++;
      }
    }

    if (stage > 0) {
      return true;
    } else {
      return false;
    }
  };
};

module.exports = Word;
