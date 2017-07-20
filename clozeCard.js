function ClozeCard(text,cloze){
  this.cloze = cloze;
  this.text = text;
}

ClozeCard.prototype.partial = function () {
  var question = this.text.replace(this.cloze,"..........");
  return question;
};

ClozeCard.prototype.fullText = function () {
  return this.text;
};

ClozeCard.prototype.showCloze = function () {
  return this.cloze;
};

module.exports = ClozeCard;
