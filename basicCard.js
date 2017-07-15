var cloze = require("./clozeCard.js");

module.exports = function BasicCard(front,back){
  this.front = front;
  this.back = back;
}

// NOTE: Front has question, Back has answer
