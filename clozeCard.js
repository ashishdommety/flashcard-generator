var basic = require("./basicCard.js");

module.exports = function CloseCard(text,cloze){
  this.cloze = cloze;
  this.partial = function(){
    var question = text.replace(cloze,"...");
    return question;
  };
  this.fullText = text;
}
