const basicConstructor = require("./basicCard.js");
const clozeConstructor = require("./clozeCard.js");

const inquirer = require("inquirer");

var basicCardArray = [];
var clozeCardArray = [];

function inquire(args) {
  return inquirer.prompt(args);
};

const start = [{
  type: "list",
  message: "How would you like to study?",
  choices: ["Basic Flashcards", "Cloze Flashcards"],
  name: "studyChoice"
}];

const basicCardQuestions = [{
    type: "input",
    message: "Type in your Question",
    name: "front"
  },
  {
    type: "input",
    message: "Type in the correct Answer",
    name: "back"
  }
];

const clozeCardQuestions = [{
    type: "input",
    message: "Type in a sentence with the answer in it",
    name: "question"
  },
  {
    type: "input",
    message: "Type in your cloze value",
    name: "answer"
  }
];

const moreCards = [{
  type: "list",
  message: "Do you want to make another card?",
  choices: ["Yes!", "No, let's start the quiz"],
  name: "confirm"
}];

inquire(start).then(function(answer) {
  if (answer.studyChoice === "Basic Flashcards") {
    console.log("You chose to use the basic flashcards!");
    basicCardPrompt();
  } else {
    console.log("You chose to use the cloze flashcards!");
    clozeCardPrompt();
  }
});

function basicCardPrompt() {
  inquire(basicCardQuestions).then(function(flashcard) {
    const basicCard = new basicConstructor(flashcard.front, flashcard.back);
    basicCardArray.push(basicCard);
    inquire(moreCards).then(function(cont) {
      if (cont.confirm === "Yes!") {
        basicCardPrompt();
      } else {
        console.log("You have created a list that has " + basicCardArray.length + " questions!");
        basicQuiz();
      }
    })
  })
};

function clozeCardPrompt() {
  inquire(clozeCardQuestions).then(function(flashcard) {
    const clozeCard = new clozeConstructor(flashcard.question, flashcard.answer);
    clozeCardArray.push(clozeCard);
    inquire(moreCards).then(function(cont) {
      if (cont.confirm === "Yes!") {
        clozeCardPrompt();
      } else {
        console.log("You have created a list that has " + clozeCardArray.length + " questions!");
        clozeQuiz();
      }
    })
  })
};

var count = 0;
var correct = 0;
var wrong = 0;

function clozeQuiz(){
  if (count < clozeCardArray.length) {
    inquirer.prompt([{
      type: "input",
      message: clozeCardArray[count].partial(),
      name: "answer"
    }]).then(function(quiz) {
      if (quiz.answer.toLowerCase() === clozeCardArray[count].cloze.toLowerCase()) {
        console.log("Correct!!");
        correct++;
      } else {
        console.log("wrong answer...");
        wrong++;
        console.log("the correct answer is: " + clozeCardArray[count].cloze);
      }
      count++;
      clozeQuiz();
    })
  } else {
    console.log(`You answered ${correct} questions correctly`);
    console.log(`You answered ${wrong} questions incorrectly`);
  }
}

function basicQuiz() {
  if (count < basicCardArray.length) {
    inquirer.prompt([{
      type: "input",
      message: basicCardArray[count].front,
      name: "answer"
    }]).then(function(quiz) {
      if (quiz.answer.toLowerCase() === basicCardArray[count].back.toLowerCase()) {
        console.log("Correct!!");
        correct++;
      } else {
        console.log("wrong answer...");
        wrong++;
        console.log("the correct answer is: " + basicCardArray[count].back);
      }
      count++;
      basicQuiz();
    })
  } else {
    console.log(`You answered ${correct} questions correctly`);
    console.log(`You answered ${wrong} questions incorrectly`);
  }
}
