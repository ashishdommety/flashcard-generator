const cloze = function ClozeCard(text,cloze){
  this.cloze = cloze;
  this.text = text;
}

cloze.prototype.partial = function () {
  var question = this.text.replace(this.cloze,"...");
  return question;
};

cloze.prototype.fullText = function () {
  return this.text;
};

cloze.prototype.showCloze = function () {
  return this.cloze;
};





module.exports = cloze;
