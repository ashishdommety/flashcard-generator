const basicConstructor = require("./basicCard.js");
const clozeConstructor = require("./clozeCard.js");

const inquirer = require("inquirer");

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
  choices:["Yes!","No, let's start the quiz"],
  name:"confirm"
}];

function basicCardPrompt() {
  inquire(basicCardQuestions).then(function(flashcard){
    const basicCard = new basicConstructor(flashcard.front,flashcard.back);
    basicCardArray.push(basicCard);
    inquire(moreBasicCards).then(function(cont){
      if(cont.confirm === "Yes!"){
        basicCardPrompt();
      }
      else{
        console.log("You have created a list that has " + basicCardArray.length + " questions!" );
        basicQuiz();
      }
    })
  })
};

var count = 0;
var correct = 0;
var wrong = 0;
function basicQuiz(){
  // console.log(basicCardArray[0].front);
  if(count < basicCardArray.length){
    inquirer.prompt([{
      type:"input",
      message: basicCardArray[count].front,
      name:"answer"
    }]).then(function(quiz){
      if(quiz.answer === basicCardArray[count].back){
        console.log("Correct!!");
        correct++;
      } else{
        console.log("wrong answer...");
        wrong++;
        console.log("the correct answer is: " + basicCardArray[count].back);
      }
      count++;
      basicQuiz();
    })
  } else{
    console.log(`You answered ${correct} questions correctly`);
    console.log(`You answered ${wrong} questions incorrectly`);
  }
}

inquire(start).then(function(answer) {
  if (answer.studyChoice === "Basic Flashcards") {
    console.log("You chose to use the basic flashcards!");
    basicCardPrompt();
  } else {
    console.log("You chose to use the cloze flashcards!");
  }
})


// TODO: Cloze Cards section
