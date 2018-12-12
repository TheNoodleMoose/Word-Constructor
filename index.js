const inquirer = require("inquirer");
const Word = require("./word");

var game = {
  wordBank: [
    "java",
    "ruby",
    "javascript",
    "mongodb",
    "express",
    "react",
    "angular",
    "python"
  ],
  guessesLeft: 10,

  currentword: {},
  guessLeft: 10,
  guessedLetters: [],

  start: function() {
    this.guessLeft = 10;
    this.guessedLetters = [];
    this.selectWord();
    this.promptUser();
  },

  selectWord: function() {
    let randomNum = Math.floor(Math.random() * this.wordBank.length);
    this.currentword = new Word(this.wordBank[randomNum]);
  },

  checkWin: function() {
    let stage = 0;
    for (let i in this.currentword.array) {
      if (this.currentword.array[i].guessed === true) {
        stage++;
      }
    }

    if (stage == this.currentword.array.length) {
      console.log("You Win!");
    } else {
      this.promptUser();
    }
  },

  guessedCorrectly: function() {
    console.log("====================");
    console.log("You Guessed Correct!");
    this.checkWin();
  },

  checkLoss: function() {
    if (this.guessLeft === 0) {
      console.log("You Lose!");
    }
  },

  promptUser: function() {
    if (this.guessLeft > 0) {
      console.log("====================");
      console.log(`Guesses Remaining: ${this.guessLeft}`);

      this.currentword.toString();

      inquirer
        .prompt([
          {
            type: "input",
            message: "What Letter Do You Want To Guess?",
            name: "guessedLetter"
          }
        ])
        .then(res => {
          if (res.guessedLetter) {
            let guess = res.guessedLetter;

            this.guessedLetters.push(res.guessedLetter);

            let guessBoolean = this.currentword.guessChar(guess);

            if (guessBoolean) {
              this.guessedCorrectly();
            } else {
              if (this.guessLeft > 0) {
                this.guessLeft--;
                this.checkLoss();
                this.promptUser();
              }
            }
          }
        });
    }
  }
};

game.start();
