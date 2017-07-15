const basicConstructor = require("./basicCard.js");
const clozeConstructor = require("./clozeCard.js");

const inquirer = require("inquirer");

// var q1 = new basic("How many cookies are in the cookie jar?", 10);
// var clozeq1 = new cloze("There are 10 cookies in the cookie jar", "10");

var basicCardArray = [];
var clozeCardArray = [];

function inquire(args) {
  return inquirer.prompt(args);
};

var start = [{
  type: "list",
  message: "How would you like to study?",
  choices: ["Basic Flashcards", "Cloze Flashcards"],
  name: "studyChoice"
}];

var basicCardQuestions = [{
  type: "input",
  message: "Type in your Question",
  name: "front"
  },
  {
  type: "input",
  message: "Type in the correct Answer",
  name: "back"
  }];

var moreBasicCards = [{
  type:"list",
  message:"Do you want to make another card?",
  choices:["Yes!","Nah, I'm good"],
  name:"confirm"
}];

function basicCardPrompt() {
  inquire(basicCardQuestions).then(function(flashcard){
    const basicCard = new basicConstructor.basic(flashcard.front, flashcard.back);
    basicCardArray.push(basicCard);
    inquire(moreBasicCards).then(function(cont){
      if(cont.confirm === "Yes!"){
        basicCardPrompt();
      }
      else{
        console.log("You have created a list that has " + basicCardArray.length + " questions!" )
      }
    })
  })
};

inquire(start).then(function(answer) {
  if (answer.studyChoice === "Basic Flashcards") {
    console.log("You chose to use the basic flashcards!");
    basicCardPrompt();
  } else {
    console.log("You chose to use the cloze flashcards!");
  }
})

// arr.push(clozeq1.partial());
// arr.push(clozeq1.fullText());
// arr.push(clozeq1.showCloze());
// console.log(arr);

// TODO: Create prompts to create basic flash cards
// TODO: create prompts to create cloze flash cards
// TODO: create a recursive function to keep asking questions for basic cards
//TODO: ^ do the same for cloze cards

// NOTE: use arrays to hold your basic cards and their
